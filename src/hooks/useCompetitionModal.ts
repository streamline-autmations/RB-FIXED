import { useState, useEffect } from 'react';

export const useCompetitionModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Always show modal after 5 seconds, regardless of previous submissions
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer);
  }, []);

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