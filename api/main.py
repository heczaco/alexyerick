from fastapi import HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import List, Optional
import os
from dotenv import load_dotenv

from models import *
from sheets_service import GoogleSheetsService
from custom_fast_api import CustomFastAPI

# Load environment variables
load_dotenv()


@asynccontextmanager
async def lifespan(app: CustomFastAPI):
    """Initialize the Google Sheets connection on startup"""
    try:
        sheets_service.connect()
        app.invitations = sheets_service.update_invitations()  # Test connection
        for key, item in app.invitations.items():
            try:
                guests = sheets_service.update_guest_list(key)
                print(guests)
            except Exception as e:
                print(f"Error updating guest list for {key}: {e}")
        print("✓ Connected to Google Sheets")
        print(f"✓ Loaded {len(app.invitations)} invitations from the spreadsheet")
    except Exception as e:
        print(f"✗ Failed to connect to Google Sheets: {e}")
    yield
    # Clean up the ML models and release the resources
    # clean yp any code here

app = CustomFastAPI(title="Heczaco's wedding E-Vite API",
                    description="wedding invitation management API using Google Sheets as the backend",
                    version="1.0.0",
                    lifespan=lifespan)

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


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Wedding E-Vite API is running",
        "status": "healthy"
    }


@app.get("/activeInvitations")
async def get_active_invitations():
    """Get all active invitations"""
    try:
        invitations = app.invitations
        return invitations
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching invitations: {str(e)}"
        )


@app.post("/api/guests_ids", response_model=InfoInvitation)
async def create_guest_ids(invitation: InvitationData):
    """Create a new invitation entry"""
    try:
        # Here you would add logic to insert the new invitation into Google Sheets
        # For now, we just return the invitation data
        return invitation
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating invitation: {str(e)}"
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
