import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of our context data
interface CompetitionContextType {
  foundLogosCount: number;
  findLogo: (logoId: string) => void;
  toastMessage: string | null;
  showCongratsModal: boolean;
  setCongratsModalOpen: (isOpen: boolean) => void;
  resetCompetition: () => void;
  isCompetitionCompleted: boolean;
  isDeviceRegistered: boolean;
  registerDevice: () => void;
  isRegistrationModalOpen: boolean;
  openRegistrationModal: () => void;
  setRegistrationModalOpen: (isOpen: boolean) => void;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

// Local Storage Keys
const LS_KEY_FOUND_LOGOS = 'recklessbear_found_logos';
const LS_KEY_COMPLETED_COMPETITION = 'recklessbear_competition_completed';
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
  const [isCompetitionCompleted, setCompetitionCompleted] = useState(false);
  const [isDeviceRegistered, setDeviceRegistered] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);

  // Initialize all state from localStorage on mount
  useEffect(() => {
    setFoundLogos(JSON.parse(localStorage.getItem(LS_KEY_FOUND_LOGOS) || '[]'));
    setDeviceRegistered(localStorage.getItem(LS_KEY_REGISTERED) === 'true');
    setCompetitionCompleted(localStorage.getItem(LS_KEY_COMPLETED_COMPETITION) === 'true');
  }, []);

  // Effect to check for competition completion
  useEffect(() => {
    if (foundLogos.length === TOTAL_LOGOS_REQUIRED && !isCompetitionCompleted) {
      console.log("Competition complete! Showing congrats modal for the first time.");
      localStorage.setItem(LS_KEY_COMPLETED_COMPETITION, 'true');
      setCompetitionCompleted(true);
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
      })
      .then(response => response.json())
      .then(data => console.log('Completion status sent to n8n:', data))
      .catch(error => console.error('Error sending completion status to n8n:', error));
    }
  }, [foundLogos, isCompetitionCompleted]);

  const findLogo = useCallback((logoId: string) => {
    if (!isDeviceRegistered) {
      console.log("User not registered. Opening registration modal.");
      setToastMessage("Please register to start finding logos!");
      setTimeout(() => setToastMessage(null), 3000);
      setRegistrationModalOpen(true);
      return;
    }

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
  }, [isDeviceRegistered, foundLogos]);

  useEffect(() => {
    window.triggerGoldenLogoFound = findLogo;
    return () => { delete window.triggerGoldenLogoFound; };
  }, [findLogo]);

  const registerDevice = useCallback(() => {
    localStorage.setItem(LS_KEY_REGISTERED, 'true');
    setDeviceRegistered(true);
  }, []);

  const openRegistrationModal = useCallback(() => {
    if (!isDeviceRegistered && !isCompetitionCompleted) {
      setRegistrationModalOpen(true);
    }
  }, [isDeviceRegistered, isCompetitionCompleted]);

  const resetCompetition = useCallback(() => {
    localStorage.removeItem(LS_KEY_FOUND_LOGOS);
    localStorage.removeItem(LS_KEY_COMPLETED_COMPETITION);
    localStorage.removeItem(LS_KEY_REGISTERED);
    localStorage.removeItem(LS_KEY_DEVICE_ID);
    localStorage.removeItem(LS_KEY_REGISTERED_EMAIL);
    window.location.reload();
  }, []);

  const contextValue = {
    foundLogosCount: foundLogos.length,
    findLogo,
    toastMessage,
    showCongratsModal,
    setCongratsModalOpen: setShowCongratsModal,
    resetCompetition,
    isCompetitionCompleted,
    isDeviceRegistered,
    registerDevice,
    isRegistrationModalOpen,
    openRegistrationModal,
    setRegistrationModalOpen,
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
