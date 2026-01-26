import gspread
from google.oauth2.service_account import Credentials
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime

from models import Guest, GuestCreate, GuestUpdate, RSVPResponse


class GoogleSheetsService:
    """Service class to handle all Google Sheets operations"""

    def __init__(self, credentials_file: str, spreadsheet_id: str):
        self.credentials_file = credentials_file
        self.spreadsheet_id = spreadsheet_id
        self.client = None
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
                if len(row) >= 3:
                    prefix = row[1]
                    invitations[prefix] = {
                        "boda": row[0],
                        "google_sheet_id": row[2],
                        "guest_list": {}
                    }
            self.invitations = invitations
            return invitations
        except Exception as e:
            raise Exception(f"Error converting table to invitations: {str(e)}")

    def update_guest_list(self, prefix: str) -> dict:
        """Updates the guest list for a specific invitation prefix"""
        try:

            invitation = self.invitations.get(prefix)
            if not invitation:
                raise Exception(f"No invitation found for prefix: {prefix}")
            
            self.sheet = self.client.open_by_key(self.invitations[prefix]["google_sheet_id"])
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
