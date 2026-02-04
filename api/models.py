from pydantic import BaseModel, RootModel, EmailStr, Field
from typing import Optional


class GuestBase(BaseModel):
    """Base model for guest data"""
    name: str = Field(..., description="Full name of the guest")
    email: EmailStr = Field(..., description="Email address of the guest")
    phone: Optional[str] = Field(None, description="Phone number of the guest")
    num_guests: int = Field(1, ge=1, le=10, description="Number of people in the party")
    dietary_restrictions: Optional[str] = Field(None, description="Any dietary restrictions")
    plus_one_name: Optional[str] = Field(None, description="Name of plus one if applicable")


class InvitationData(BaseModel):
    """Model for invitation data"""
    boda: str = Field(..., description="Name of the wedding event")
    google_sheet_id: str = Field(..., description="Google Sheet ID associated with the invitation")


class ActiveInvitations(RootModel):
    """Model for active invitations dictionary"""
    root: dict[str, InvitationData] = Field(..., description="Dictionary mapping prefix to invitation data")

    class Config:
        json_schema_extra = {
            "example": {
                "00": {
                    "boda": "Alex & Yerick",
                    "google_sheet_id": "1abc123def456"
                }
            }
        }


class eViteInfo(BaseModel):
    """Model for detailed invitation information"""
    prefix: str = Field(..., description="Unique prefix for the invitation")
    boda: str = Field(..., description="Name of the wedding event")
    google_sheet_id: str = Field(..., description="Google Sheet ID associated with the invitation")


class InfoInvitation(BaseModel):
    """Model for detailed invitation information"""
    prefix: str = Field(..., description="Unique prefix for the invitation")
    boda: str = Field(..., description="Name of the wedding event")
    google_sheet_id: str = Field(..., description="Google Sheet ID associated with the invitation")
    created_ids: int = Field(..., description="Number of created guest IDs")
    num_guests: int = Field(..., description="Total number of guests invited")