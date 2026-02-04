import gspread
from gspread.exceptions import WorksheetNotFound
from google.oauth2.service_account import Credentials
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime


class GoogleSheetsService:
    """Service class to handle all Google Sheets operations"""

    def __init__(self, credentials_file: str, spreadsheet_id: str):
        self.credentials_file = credentials_file
        self.spreadsheet_id = spreadsheet_id
        self.client: gspread.Client
        self.sheet = None
        self.worksheet = None
        # Define the scope
        self.scope = [
            'https://spreadsheets.google.com/feeds',
            'https://www.googleapis.com/auth/drive'
        ]

    def connect(self):
        """Establish connection to Google Sheets"""
        try:
            creds = Credentials.from_service_account_file(
                self.credentials_file,
                scopes=self.scope
            )
            self.client = gspread.authorize(creds)
            self.sheet = self.client.open_by_key(self.spreadsheet_id)
            self.invitationsWorksheet = self.sheet.worksheet("invitations")

        except Exception as e:
            raise Exception(f"Failed to connect to Google Sheets: {str(e)}")

    def update_invitations(self) -> dict:
        """Converts the entire sheet to a dict where the keys are the second column (prefix) and
        values are the 1st and 3rd columns (boda, and google_sheet_id)"""
        try:
            all_rows = self.invitationsWorksheet.get_all_values()
            invitations = {}
            for row in all_rows[1:]:  # Skip header row
                if len(row) >= 4 and row[3] != "FALSE":  # Ensure there are enough columns and prefix is not empty
                    prefix = row[1]
                    invitations[prefix] = {
                        "boda": row[0],
                        "google_sheet_id": row[2],
                        "guest_list": {},
                        "tags": {}
                    }
            self.invitations = invitations
            # get tags for each invitation
            for invitation in self.invitations.keys():
                self.invitations[invitation]["tags"] = self.get_info_tags(invitation)
            return invitations
        except Exception as e:
            raise Exception(f"Error converting table to invitations: {str(e)}")

    def update_guest_list(self, prefix: str) -> dict:
        """Updates the guest list for a specific invitation prefix"""
        try:

            invitation = self.invitations.get(prefix)
            if not invitation:
                raise Exception(f"No invitation found for prefix: {prefix}")

            invitation["tags"] = self.get_info_tags(prefix)
            self.sheet = self.client.open_by_key(invitation["google_sheet_id"])
            sheet_connection = self.sheet.worksheet("guests")
            all_rows = sheet_connection.get_all_values()
            if not all_rows or len(all_rows) < 2:
                return {}
            # Get headers from first row
            headers = all_rows[0]
            # Find uuid column index
            try:
                uuid_index = headers.index("uuid")
            except ValueError:
                raise Exception("No 'uuid' column found in the sheet")
            # Filter headers to exclude those starting with underscore
            valid_columns = [
                (i, header) for i, header in enumerate(headers)
                if not header.startswith("_")
            ]

            # we replace headers with tag values if they exist
            for tag, value in invitation["tags"].items():
                if value in headers:
                    idx = headers.index(value)
                    headers[idx] = (idx, tag)

            guests = {}
            for row in all_rows[1:]:  # Skip header row
                if len(row) > uuid_index and row[uuid_index]:
                    uuid_key = row[uuid_index]
                    guest_data = {}
                    for col_index, col_name in valid_columns:
                        if col_index < len(row):
                            guest_data[col_name] = row[col_index]
                        else:
                            guest_data[col_name] = ""
                    guests[uuid_key] = guest_data
            invitation["guest_list"] = guests
            return guests
        except Exception as e:
            raise Exception(f"Error updating guest list for prefix {prefix}: {str(e)}")

    def create_uuids(self, prefix: str,
                     mandatory_fields: list[str] = ["Nombre Principal", "Telefono"]) -> tuple[int, int]:
        """Generates new UUIDs and returns a tuple of (uuids_created, total_guests_with_uuid)"""
        try:
            invitation = self.invitations.get(prefix)
            if not invitation:
                raise Exception(f"No invitation found for prefix: {prefix}")

            self.sheet = self.client.open_by_key(invitation["google_sheet_id"])
            worksheet = self.sheet.worksheet("guests")
            all_rows = worksheet.get_all_values()

            if not all_rows:
                raise Exception("Sheet is empty")

            headers = all_rows[0]

            # Find indices for obligatory headers and uuid
            try:
                uuid_index = headers.index("uuid")
            except ValueError:
                raise Exception("No 'uuid' column found in the sheet")

            obligatory_indices = []
            for header in mandatory_fields:
                try:
                    obligatory_indices.append(next(i for i, h in enumerate(headers) if h.lower() == header.lower()))
                except ValueError:
                    raise Exception(f"Obligatory header '{header}' not found in sheet")

            # Process each row (skip header)
            updates = []
            existing_uuids = 0
            for row_num, row in enumerate(all_rows[1:], start=2):
                # Check if uuid is empty
                has_uuid = len(row) > uuid_index and row[uuid_index].strip()

                # Check if all obligatory fields are filled
                has_all_obligatory = all(
                    len(row) > idx and row[idx].strip()
                    for idx in obligatory_indices
                )

                # If has all obligatory fields but no uuid, generate one
                if has_all_obligatory and not has_uuid:
                    new_uuid = str(uuid.uuid4())
                    updates.append({
                        'range': f'{chr(65 + uuid_index)}{row_num}',  # Convert column index to letter
                        'values': [[new_uuid]]
                    })
                elif has_uuid:
                    existing_uuids += 1

            # Batch update all rows that need UUIDs
            if updates:
                worksheet.batch_update(updates)

            uuids_created = len(updates)
            total_guests = existing_uuids + uuids_created
            return (uuids_created, total_guests)

        except Exception as e:
            raise Exception(f"Error creating UUIDs for prefix {prefix}: {str(e)}")

    def get_info_tags(self, prefix: str) -> dict:
        """Reads tag/value pairs from the info sheet and returns them as a dictionary"""
        try:
            invitation = self.invitations.get(prefix)
            if not invitation:
                raise Exception(f"No invitation found for prefix: {prefix}")

            self.sheet = self.client.open_by_key(invitation["google_sheet_id"])
            worksheet = self.sheet.worksheet("info")
            all_rows = worksheet.get_all_values()

            if not all_rows or len(all_rows) < 2:
                return {}

            # Convert tag/value pairs to dictionary
            info_dict = {}
            for row in all_rows[1:]:  # Skip header row
                if len(row) >= 2 and row[0]:  # Ensure we have at least tag and value
                    tag = row[0]
                    value = row[1]
                    info_dict[tag] = value

            return info_dict
        except WorksheetNotFound:
            # If the info worksheet does not exist, return empty dict
            return {}
        except Exception as e:
            raise Exception(f"Error reading info tags for prefix {prefix}: {str(e)}")

    def rsvp_guest(self, prefix: str, uuid: str, confirmed_guests:int, message: Optional[str] = None) -> None:
        """Updates the RSVP status of a guest identified by UUID"""
        try:
            invitation = self.invitations.get(prefix)
            if not invitation:
                raise Exception(f"No invitation found for prefix: {prefix}")

            self.sheet = self.client.open_by_key(invitation["google_sheet_id"])
            worksheet = self.sheet.worksheet("guests")
            all_rows = worksheet.get_all_values()

            if not all_rows:
                raise Exception("Sheet is empty")

            headers = all_rows[0]

            # Find indices for uuid, RSVP status, confirmed guests, and message
            try:
                uuid_index = headers.index("uuid")
                rsvp_index = headers.index("RSVP Status")
                confirmed_index = headers.index("Confirmed Guests")
                message_index = headers.index("Message")
            except ValueError as ve:
                raise Exception(f"Required column not found: {str(ve)}")

            # Find the row with the matching UUID
            for row_num, row in enumerate(all_rows[1:], start=2):
                if len(row) > uuid_index and row[uuid_index] == uuid:
                    # Update RSVP status and confirmed guests
                    updates = []
                    updates.append({
                        'range': f'{chr(65 + rsvp_index)}{row_num}',
                        'values': [["Confirmed"]]
                    })
                    updates.append({
                        'range': f'{chr(65 + confirmed_index)}{row_num}',
                        'values': [[str(confirmed_guests)]]
                    })
                    if message is not None:
                        updates.append({
                            'range': f'{chr(65 + message_index)}{row_num}',
                            'values': [[message]]
                        })
                    # Batch update the row
                    worksheet.batch_update(updates)
                    return

            raise Exception(f"No guest found with UUID: {uuid}")

        except Exception as e:
            raise Exception(f"Error updating RSVP for UUID {uuid} in prefix {prefix}: {str(e)}")