import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastNotificationProps {
  message: string | null;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2800); // A bit shorter than the provider's timeout to allow for the exit animation

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    // This container centers the toast on the screen
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full shadow-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification;

