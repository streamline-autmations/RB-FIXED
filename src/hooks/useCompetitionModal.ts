import { useState, useEffect } from 'react';

export const useCompetitionModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if modal has already been shown in this session
    const modalShown = sessionStorage.getItem('competition-modal-shown');
    
    if (!modalShown && !hasShown) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        setHasShown(true);
        sessionStorage.setItem('competition-modal-shown', 'true');
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [hasShown]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    closeModal,
    openModal
  };
};