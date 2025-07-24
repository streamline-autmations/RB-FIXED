import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of our context data
interface CompetitionContextType {
  foundLogosCount: number;
  findLogo: (logoId: string) => void;
  toastMessage: string | null;
  showCongratsModal: boolean;
  setCongratsModalOpen: (isOpen: boolean) => void;
  resetCompetition: () => void; // For development/testing
}

// Create the context
const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

// Local Storage Keys (re-declared for clarity in this file)
const LS_KEY_FOUND_LOGOS = 'recklessbear_found_logos';
const LS_KEY_COMPLETED_COMPETITION = 'recklessbear_competition_completed';
const TOTAL_LOGOS_REQUIRED = 5; // Define total logos required here

interface CompetitionProviderProps {
  children: ReactNode;
}

export const CompetitionProvider: React.FC<CompetitionProviderProps> = ({ children }) => {
  const [foundLogos, setFoundLogos] = useState<string[]>([]);
  const [foundLogosCount, setFoundLogosCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  // --- Initialize state from localStorage on mount ---
  useEffect(() => {
    const storedFoundLogos = JSON.parse(localStorage.getItem(LS_KEY_FOUND_LOGOS) || '[]');
    setFoundLogos(storedFoundLogos);
    setFoundLogosCount(storedFoundLogos.length);

    // If competition was already completed on this device, show congrats modal directly
    if (localStorage.getItem(LS_KEY_COMPLETED_COMPETITION) === 'true') {
      setShowCongratsModal(true);
    }
  }, []);

  // --- Effect to update foundLogosCount and check for completion ---
  useEffect(() => {
    setFoundLogosCount(foundLogos.length);
    if (foundLogos.length === TOTAL_LOGOS_REQUIRED && localStorage.getItem(LS_KEY_COMPLETED_COMPETITION) !== 'true') {
      localStorage.setItem(LS_KEY_COMPLETED_COMPETITION, 'true');
      setShowCongratsModal(true);
      // --- IMPORTANT: Trigger n8n webhook for competition completion here ---
      // You'll need the user's email or device_id from localStorage (set during registration)
      const deviceId = localStorage.getItem('recklessbear_device_id');
      const registeredEmail = localStorage.getItem('recklessbear_registered_email');
      
      console.log('All 5 logos found! Triggering n8n webhook for completion...');
      // Example fetch call (replace with your actual n8n webhook URL for completion)
      /*
      fetch('YOUR_N8N_COMPLETION_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: deviceId,
          email: registeredEmail, // Send email if available
          competition_completed: true,
          timestamp: new Date().toISOString(),
        }),
      })
      .then(response => response.json())
      .then(data => console.log('Completion status sent to n8n:', data))
      .catch(error => console.error('Error sending completion status to n8n:', error));
      */
      // --- END IMPORTANT ---
    }
  }, [foundLogos]); // Re-run when foundLogos array changes

  // --- Function to handle a logo being found ---
  const findLogo = useCallback((logoId: string) => {
    setFoundLogos(prevFoundLogos => {
      if (!prevFoundLogos.includes(logoId)) {
        const newFoundLogos = [...prevFoundLogos, logoId];
        localStorage.setItem(LS_KEY_FOUND_LOGOS, JSON.stringify(newFoundLogos));

        // Trigger toast message
        setToastMessage(`Golden Logo Found! (${newFoundLogos.length}/${TOTAL_LOGOS_REQUIRED} found)`);
        setTimeout(() => setToastMessage(null), 3000); // Hide toast after 3 seconds

        // Apply 'found' class to the element if it exists in the DOM
        const logoElement = document.getElementById(logoId);
        if (logoElement) {
          logoElement.classList.add('found');
          // Add a temporary animation class if desired
          logoElement.classList.add('animate-sparkle'); // You'll define 'animate-sparkle' in CSS
          setTimeout(() => logoElement.classList.remove('animate-sparkle'), 500);
        }

        return newFoundLogos;
      }
      return prevFoundLogos; // Logo already found
    });
  }, []);

  // --- Expose findLogo globally for non-React elements (like direct HTML) or for convenience ---
  useEffect(() => {
    window.triggerGoldenLogoFound = findLogo;
    return () => {
      delete window.triggerGoldenLogoFound; // Clean up on unmount
    };
  }, [findLogo]);

  // --- Function to close the congrats modal ---
  const handleCloseCongrats = useCallback(() => {
    setShowCongratsModal(false);
    // You might want to also reset the competition state if it's a one-time thing
    // or just let the user continue browsing.
  }, []);

  // --- Function to reset competition state (for testing/development) ---
  const resetCompetition = useCallback(() => {
    localStorage.removeItem(LS_KEY_FOUND_LOGOS);
    localStorage.removeItem(LS_KEY_COMPLETED_COMPETITION);
    setFoundLogos([]);
    setFoundLogosCount(0);
    setShowCongratsModal(false);
    setToastMessage(null);
    // Remove 'found' class from all logos in the DOM
    document.querySelectorAll('.golden-logo-image.found').forEach(el => {
      el.classList.remove('found');
    });
    console.log('Competition state reset in localStorage and UI.');
  }, []);

  const contextValue = {
    foundLogosCount,
    findLogo,
    toastMessage,
    showCongratsModal,
    setCongratsModalOpen: setShowCongratsModal, // Expose setter for CompetitionModal to use
    onCloseCongrats: handleCloseCongrats, // Pass the close handler
    resetCompetition,
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
