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
  rsvpActive: boolean;
  [key: string]: any; // Allow other properties from API
}

interface GuestContextType {
  guestData: GuestData;
  setGuestData: (data: Partial<GuestData>) => void;
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
    rsvpActive: false,
};

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [guestData, setGuestDataState] = useState<GuestData>(defaultGuestData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  return (
    <GuestContext.Provider value={{ guestData, setGuestData, isLoading, error }}>
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
