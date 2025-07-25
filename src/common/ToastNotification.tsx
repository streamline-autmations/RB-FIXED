import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastNotificationProps {
  message: string | null;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          // Position for mobile (default): center of the screen
          // Position for desktop (md: breakpoint): bottom-center
          className="fixed left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg text-center z-[1001] pointer-events-none
                     top-1/2 -translate-y-1/2 md:bottom-6 md:top-auto md:-translate-y-0"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p className="font-bold text-lg">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
