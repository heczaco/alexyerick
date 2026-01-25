from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class GuestBase(BaseModel):
    """Base model for guest data"""
    name: str = Field(..., description="Full name of the guest")
    email: EmailStr = Field(..., description="Email address of the guest")
    phone: Optional[str] = Field(None, description="Phone number of the guest")
    num_guests: int = Field(1, ge=1, le=10, description="Number of people in the party")
    dietary_restrictions: Optional[str] = Field(None, description="Any dietary restrictions")
    plus_one_name: Optional[str] = Field(None, description="Name of plus one if applicable")


class GuestCreate(GuestBase):
    """Model for creating a new guest"""
    pass


class GuestUpdate(BaseModel):
    """Model for updating guest information"""
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    num_guests: Optional[int] = Field(None, ge=1, le=10)
    dietary_restrictions: Optional[str] = None
    plus_one_name: Optional[str] = None


class RSVPResponse(BaseModel):
    """Model for RSVP response"""
    attending: bool = Field(..., description="Whether the guest is attending")
    num_guests: int = Field(1, ge=1, le=10, description="Number of people attending")
    dietary_restrictions: Optional[str] = Field(None, description="Any dietary restrictions")
    plus_one_name: Optional[str] = Field(None, description="Name of plus one if applicable")
    message: Optional[str] = Field(None, description="Message to the couple")


class Guest(GuestBase):
    """Complete guest model with all fields"""
    id: str = Field(..., description="Unique identifier for the guest")
    rsvp_status: str = Field("pending", description="Status of RSVP: pending, confirmed")
    attending: Optional[bool] = Field(None, description="Whether the guest is attending")
    message: Optional[str] = Field(None, description="Message from the guest")
    created_at: str = Field(..., description="Timestamp when guest was created")
    updated_at: str = Field(..., description="Timestamp when guest was last updated")
    row_number: int = Field(0, description="Row number in the spreadsheet (internal use)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "+1234567890",
                "num_guests": 2,
                "rsvp_status": "confirmed",
                "dietary_restrictions": "Vegetarian",
                "plus_one_name": "Jane Doe",
                "attending": True,
                "message": "Looking forward to celebrating with you!",
                "created_at": "2026-01-25T10:30:00",
                "updated_at": "2026-01-25T15:45:00",
                "row_number": 5
            }
        }
