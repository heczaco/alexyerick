from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import os
from dotenv import load_dotenv

from models import Guest, GuestCreate, GuestUpdate, RSVPResponse
from sheets_service import GoogleSheetsService

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Wedding E-Vite API",
    description="API for managing wedding guests using Google Sheets as database",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Google Sheets service
sheets_service = GoogleSheetsService(
    credentials_file="server_credentials.json",
    spreadsheet_id='1QqgmRZ04xg1SG1YkWCa9iBqc1PmXRse7x8nMpL5LEGQ'
)


@app.on_event("startup")
async def startup_event():
    """Initialize the Google Sheets connection on startup"""
    try:
        sheets_service.connect()
        invitations = sheets_service.update_invitations()  # Test connection
        print(invitations)
        print("✓ Connected to Google Sheets")
        print(f"✓ Loaded {len(invitations)} invitations from the spreadsheet")
    except Exception as e:
        print(f"✗ Failed to connect to Google Sheets: {e}")


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Wedding E-Vite API is running",
        "status": "healthy"
    }


@app.get("/api/guests", response_model=List[Guest])
async def get_all_guests():
    """Get all guests from the database"""
    try:
        guests = sheets_service.get_all_guests()
        return guests
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching guests: {str(e)}"
        )


@app.get("/api/guests/{guest_id}", response_model=Guest)
async def get_guest(guest_id: str):
    """Get a specific guest by ID"""
    try:
        guest = sheets_service.get_guest_by_id(guest_id)
        if not guest:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Guest with ID {guest_id} not found"
            )
        return guest
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching guest: {str(e)}"
        )


@app.get("/api/guests/email/{email}", response_model=Guest)
async def get_guest_by_email(email: str):
    """Get a specific guest by email"""
    try:
        guest = sheets_service.get_guest_by_email(email)
        if not guest:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Guest with email {email} not found"
            )
        return guest
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching guest: {str(e)}"
        )


@app.post("/api/guests", response_model=Guest, status_code=status.HTTP_201_CREATED)
async def create_guest(guest: GuestCreate):
    """Create a new guest"""
    try:
        # Check if email already exists
        existing_guest = sheets_service.get_guest_by_email(guest.email)
        if existing_guest:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Guest with this email already exists"
            )
        
        new_guest = sheets_service.create_guest(guest)
        return new_guest
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating guest: {str(e)}"
        )


@app.put("/api/guests/{guest_id}", response_model=Guest)
async def update_guest(guest_id: str, guest_update: GuestUpdate):
    """Update a guest's information"""
    try:
        updated_guest = sheets_service.update_guest(guest_id, guest_update)
        if not updated_guest:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Guest with ID {guest_id} not found"
            )
        return updated_guest
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating guest: {str(e)}"
        )


@app.post("/api/rsvp/{guest_id}", response_model=Guest)
async def update_rsvp(guest_id: str, rsvp_data: RSVPResponse):
    """Update guest's RSVP status"""
    try:
        updated_guest = sheets_service.update_rsvp(guest_id, rsvp_data)
        if not updated_guest:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Guest with ID {guest_id} not found"
            )
        return updated_guest
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating RSVP: {str(e)}"
        )


@app.delete("/api/guests/{guest_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_guest(guest_id: str):
    """Delete a guest"""
    try:
        success = sheets_service.delete_guest(guest_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Guest with ID {guest_id} not found"
            )
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting guest: {str(e)}"
        )


@app.get("/api/stats")
async def get_stats():
    """Get statistics about guests and RSVPs"""
    try:
        stats = sheets_service.get_stats()
        return stats
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching stats: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
