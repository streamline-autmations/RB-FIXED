import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// --- Local Storage Keys (we still use these to remember the user's email on a device) ---
const LS_KEY_REGISTERED_EMAIL = 'recklessbear_registered_email';
const LS_KEY_DEVICE_ID = 'recklessbear_device_id';

const TOTAL_LOGOS_REQUIRED = 5;

// --- Define the shape of our new context data ---
interface CompetitionContextType {
  isLoading: boolean;
  isRegistered: boolean;
  logosFound: number;
  status: 'Incomplete' | 'Completed' | null;
  toastMessage: string | null;
  showCongratsModal: boolean;
  isRegistrationModalOpen: boolean;
  setRegistrationModalOpen: (isOpen: boolean) => void;
  findLogo: (logoId: string) => void;
  registerUser: (formData: { fullName: string; email: string; phone: string; deviceId: string | null }) => Promise<any>;
  resetCompetition: () => void;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

export const CompetitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- NEW State Management ---
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [logosFound, setLogosFound] = useState(0);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [status, setStatus] = useState<'Incomplete' | 'Completed' | null>(null);
  
  // State for UI notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

  // --- NEW: Checks user status against our Airtable API ---
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
          if (data.status === 'Completed') {
            setShowCongratsModal(true);
          }
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
  
  // --- NEW: Registers a new user via our Airtable API ---
  const registerUser = async (formData) => {
    const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem(LS_KEY_REGISTERED_EMAIL, formData.email);
      await checkUser(); // Refresh user state from Airtable
    }
    return data;
  };

  // --- NEW: Updates the user's logo count via our Airtable API ---
  const updateProgress = async (newCount: number) => {
    if (!recordId) {
      console.error("Cannot update progress: user recordId is missing.");
      return;
    }
    
    setLogosFound(newCount); // Update state immediately for a smooth UX
    setToastMessage(`Golden Logo Found! (${newCount}/${TOTAL_LOGOS_REQUIRED} found)`);
    setTimeout(() => setToastMessage(null), 3000);

    await fetch('/api/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId, logosFound: newCount }),
    });

    // --- PRESERVED: Check for completion and fire webhook ---
    if (newCount === TOTAL_LOGOS_REQUIRED && status !== 'Completed') {
      setStatus('Completed');
      setShowCongratsModal(true);

      const deviceId = localStorage.getItem(LS_KEY_DEVICE_ID);
      const registeredEmail = localStorage.getItem(LS_KEY_REGISTERED_EMAIL);
      const N8N_COMPLETION_WEBHOOK_URL = 'https://dockerfile-1n82.onrender.com/webhook/competision-completed';
      
      console.log('Triggering n8n webhook for completion...');
      fetch(N8N_COMPLETION_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device_id: deviceId,
          email: registeredEmail,
          competition_completed: true,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  };

  // --- UPDATED: This is the function called when a logo is clicked ---
  const findLogo = (logoId: string) => {
    if (!isRegistered) {
      setToastMessage("Please register to start finding logos!");
      setTimeout(() => setToastMessage(null), 3000);
      setRegistrationModalOpen(true);
      return;
    }

    if (status === 'Completed') {
      setToastMessage("You've already found all the logos!");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    // Since we don't track individual logos anymore, we just increment the count
    const newCount = logosFound + 1;
    if (newCount <= TOTAL_LOGOS_REQUIRED) {
        updateProgress(newCount);
    }
  };
  
  // Make the findLogo function globally available
  useEffect(() => {
    window.triggerGoldenLogoFound = findLogo;
    return () => { delete window.triggerGoldenLogoFound; };
  }, [findLogo]);

  const resetCompetition = () => {
    localStorage.removeItem(LS_KEY_REGISTERED_EMAIL);
    window.location.reload();
  };

  const contextValue = {
    isLoading,
    isRegistered,
    logosFound,
    recordId,
    status,
    toastMessage,
    showCongratsModal,
    isRegistrationModalOpen,
    setRegistrationModalOpen,
    findLogo,
    registerUser,
    resetCompetition,
  };

  return (
    <CompetitionContext.Provider value={contextValue}>
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};
