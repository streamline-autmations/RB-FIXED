import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// --- Local Storage Keys ---
// We still use these to remember the user on a specific device
const LS_KEY_DEVICE_ID = 'recklessbear_device_id';
const LS_KEY_REGISTERED_EMAIL = 'recklessbear_registered_email';

// --- Define the shape of our new context data ---
interface CompetitionContextType {
  isLoading: boolean;
  isRegistered: boolean;
  logosFound: number;
  recordId: string | null;
  status: 'Incomplete' | 'Completed' | null;
  updateProgress: (newCount: number) => Promise<void>;
  registerUser: (formData: { fullName: string; email: string; phone: string; deviceId: string | null }) => Promise<any>;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [logosFound, setLogosFound] = useState(0);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [status, setStatus] = useState<'Incomplete' | 'Completed' | null>(null);

  // --- NEW: This function checks the user's status against our API ---
  const checkUser = useCallback(async () => {
    setIsLoading(true);
    const email = localStorage.getItem(LS_KEY_REGISTERED_EMAIL);
    
    if (email) {
      try {
        const response = await fetch('/api/check-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (data.exists) {
          setIsRegistered(true);
          setLogosFound(data.logosFound);
          setRecordId(data.recordId);
          setStatus(data.status);
        }
      } catch (error) {
        console.error("Failed to check user status:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Run the check once when the application first loads
  useEffect(() => {
    checkUser();
  }, [checkUser]);
  
  // --- NEW: This function registers a new user via our API ---
  const registerUser = async (formData) => {
    const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      // Save the email to remember the user on this device
      localStorage.setItem(LS_KEY_REGISTERED_EMAIL, formData.email);
      // Refresh the user's state after successful registration
      await checkUser(); 
    }
    return data;
  };

  // --- NEW: This function updates the user's logo count via our API ---
  const updateProgress = async (newCount: number) => {
    if (!recordId) {
      console.error("Cannot update progress: user recordId is missing.");
      return;
    }
    setLogosFound(newCount); // Update state immediately for a smooth UX
    
    await fetch('/api/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId, logosFound: newCount }),
    });
  };
  
  const value = { isLoading, isRegistered, logosFound, recordId, status, updateProgress, registerUser };

  return <CompetitionContext.Provider value={value}>{children}</CompetitionContext.Provider>;
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};
