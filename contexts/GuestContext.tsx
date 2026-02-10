import { Config } from '@/constants/Config';
import { useGlobalSearchParams } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface GuestData {
  name_1: string;
  name_2: string;
  nickname_1: string;
  nickname_2: string;
  available_invitations: number;
  confirmation_field: string | null;
  invitation_status: string;
  rsvpActive: boolean;
  [key: string]: any; // Allow other properties from API
}

interface GuestContextType {
  guestData: GuestData;
  setGuestData: (data: Partial<GuestData>) => void;
  updateGuestStatus: (status: string) => void;
  isLoading: boolean;
  error: string | null;
}

const defaultGuestData: GuestData = {
    name_1: '',
    name_2: '',
    nickname_1: '',
    nickname_2: '',
    available_invitations: 0,
    confirmation_field: null,
    invitation_status: '',
    rsvpActive: false,
};

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [guestData, setGuestDataState] = useState<GuestData>(defaultGuestData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const params = useGlobalSearchParams();

  useEffect(() => {
    const fetchGuestData = async () => {
      const id = params.id as string;
      
      if (!id) {
        // No ID in URL, use default data
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const url = `https://googlesheets-invitations-api.onrender.com/guests/${Config.INVITATION_ID}-${id}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch guest data: ${response.status}`);
        }

        const data = await response.json();
        data.rsvpActive = data.name_1 !== "" && data.name_1 !== null;
        console.log(data);
        setGuestDataState({
          ...defaultGuestData,
          ...data,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching guest data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuestData();
  }, [params.id]);

  const setGuestData = (data: Partial<GuestData>) => {
    setGuestDataState(prev => ({ ...prev, ...data }));
  };

  const updateGuestStatus = (status: string) => {
    const id = params.id as string;
    
    if (!id) {
      return;
    }
    if ((guestData.invitation_status === status)  ||
        (guestData.invitation_status === "Confirmada por eVite") ||
        (guestData.name_1 === "") ||
        isUpdatingStatus) // Prevent multiple simultaneous requests
    {
      return;
    }
    
    setIsUpdatingStatus(true);
    
    // Fire and forget - don't block the app
    fetch(`https://googlesheets-invitations-api.onrender.com/guests/status/${Config.INVITATION_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uuid: id,
        status: status,
      }),
    })
      .then(response => {
        if (response.ok) {
          // Update local state on successful 200 response
          setGuestDataState(prev => ({ ...prev, invitation_status: status }));
        }
        return response;
      })
      .catch(err => {
        console.error('Error updating guest status:', err);
      })
      .finally(() => {
        setIsUpdatingStatus(false);
      });
  };

  return (
    <GuestContext.Provider value={{ guestData, setGuestData, updateGuestStatus, isLoading, error }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error('useGuest must be used within a GuestProvider');
  }
  return context;
}
