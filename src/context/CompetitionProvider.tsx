import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of our context data
interface CompetitionContextType {
  foundLogosCount: number;
  findLogo: (logoId: string) => void;
  toastMessage: string | null;
  showCongratsModal: boolean;
  setCongratsModalOpen: (isOpen: boolean) => void;
  resetCompetition: () => void;
  isCompetitionCompleted: boolean; // <-- ADDED
}

// Create the context
const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

// Local Storage Keys
const LS_KEY_FOUND_LOGOS = 'recklessbear_found_logos';
const LS_KEY_COMPLETED_COMPETITION = 'recklessbear_competition_completed'; // This is the key for the new logic
const LS_KEY_REGISTERED = 'recklessbear_competition_registered';
const LS_KEY_DEVICE_ID = 'recklessbear_device_id';
const LS_KEY_REGISTERED_EMAIL = 'recklessbear_registered_email';

const TOTAL_LOGOS_REQUIRED = 5;

interface CompetitionProviderProps {
  children: ReactNode;
}

export const CompetitionProvider: React.FC<CompetitionProviderProps> = ({ children }) => {
  const [foundLogos, setFoundLogos] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  // --- NEW: State to track if the competition has been permanently completed ---
  const [isCompetitionCompleted, setCompetitionCompleted] = useState<boolean>(() => {
    return localStorage.getItem(LS_KEY_COMPLETED_COMPETITION) === 'true';
  });

  // --- Initialize state from localStorage on mount ---
  useEffect(() => {
    const storedFoundLogos = JSON.parse(localStorage.getItem(LS_KEY_FOUND_LOGOS) || '[]');
    setFoundLogos(storedFoundLogos);
  }, []);

  // --- Effect to check for completion ---
  useEffect(() => {
    // Check if 5 logos are found AND the competition hasn't been marked as completed yet
    if (foundLogos.length === TOTAL_LOGOS_REQUIRED && !isCompetitionCompleted) {
      console.log("Competition complete! Showing congrats modal for the first time.");
      
      localStorage.setItem(LS_KEY_COMPLETED_COMPETITION, 'true'); // Permanently mark as completed
      setCompetitionCompleted(true); // Update the state
      setShowCongratsModal(true); // Show the modal this one time
      
      // --- IMPORTANT: Trigger n8n webhook for competition completion here ---
      const deviceId = localStorage.getItem(LS_KEY_DEVICE_ID);
      const registeredEmail = localStorage.getItem(LS_KEY_REGISTERED_EMAIL);
      const N8N_COMPLETION_WEBHOOK_URL = 'https://dockerfile-1n82.onrender.com/webhook/competision-completed';

      console.log('Triggering n8n webhook for completion...');
      fetch(N8N_COMPLETION_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: deviceId,
          email: registeredEmail,
          competition_completed: true,
          timestamp: new Date().toISOString(),
        }),
      })
      .then(response => response.json())
      .then(data => console.log('Completion status sent to n8n:', data))
      .catch(error => console.error('Error sending completion status to n8n:', error));
    }
  }, [foundLogos, isCompetitionCompleted]); // Re-run when foundLogos or completion status changes

  // --- Function to handle a logo being found ---
  const findLogo = useCallback((logoId: string) => {
    // No changes needed in this function
    if (!foundLogos.includes(logoId)) {
        const newFoundLogos = [...foundLogos, logoId];
        setFoundLogos(newFoundLogos);
        localStorage.setItem(LS_KEY_FOUND_LOGOS, JSON.stringify(newFoundLogos));
        setToastMessage(`Golden Logo Found! (${newFoundLogos.length}/${TOTAL_LOGOS_REQUIRED} found)`);
        setTimeout(() => setToastMessage(null), 3000);
        const logoElement = document.getElementById(logoId);
        if (logoElement) {
          logoElement.classList.add('found');
        }
    }
  }, [foundLogos]);

  // --- Expose findLogo globally ---
  useEffect(() => {
    window.triggerGoldenLogoFound = findLogo;
    return () => {
      delete window.triggerGoldenLogoFound;
    };
  }, [findLogo]);

  // --- Function to reset competition state (for testing) ---
  const resetCompetition = useCallback(() => {
    // No changes needed here, it correctly removes the new key
    localStorage.removeItem(LS_KEY_FOUND_LOGOS);
    localStorage.removeItem(LS_KEY_COMPLETED_COMPETITION);
    localStorage.removeItem(LS_KEY_REGISTERED);
    localStorage.removeItem(LS_KEY_DEVICE_ID);
    localStorage.removeItem(LS_KEY_REGISTERED_EMAIL);
    setFoundLogos([]);
    setShowCongratsModal(false);
    setCompetitionCompleted(false); // Reset the state
    console.log('Competition state reset. Reloading page.');
    window.location.reload();
  }, []);
  
  // --- Define the context value to be passed down ---
  const contextValue = {
    foundLogosCount: foundLogos.length,
    findLogo,
    toastMessage,
    showCongratsModal,
    setCongratsModalOpen: setShowCongratsModal,
    resetCompetition,
    isCompetitionCompleted, // <-- Expose the new state
  };

  return (
    <CompetitionContext.Provider value={contextValue}>
      {children}
    </CompetitionContext.Provider>
  );
};

// Custom hook to use the competition context
export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error('useCompetition must be used within a CompetitionProvider');
  }
  return context;
};
