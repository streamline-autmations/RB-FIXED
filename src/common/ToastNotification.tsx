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
          // Position for mobile (default): center of the screen using flexbox
          // Position for desktop (md: breakpoint): bottom-center using fixed values
          className="fixed inset-0 flex items-center justify-center z-[1001] pointer-events-none
                     md:bottom-6 md:left-1/2 md:transform md:-translate-x-1/2 md:inset-auto"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg text-center">
            <p className="font-bold text-lg">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;

