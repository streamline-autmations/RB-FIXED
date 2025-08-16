import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, Instagram, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionProvider';

// Your props and FormData interfaces can stay the same
interface CompetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCongrats: boolean; 
  onCloseCongrats: () => void;
}

interface FormData {
  fullName: string; email: string; phone: string; location: string; agreeToTerms: boolean;
}

const LS_KEY_DEVICE_ID = 'recklessbear_device_id';

const CompetitionModal: React.FC<CompetitionModalProps> = ({ isOpen, onClose, showCongrats, onCloseCongrats }) => {
  // --- UPDATED: We now get the registerUser function from our new provider ---
  const { registerUser } = useCompetition();
  
  // All your form state management can stay the same
  const [formData, setFormData] = useState<FormData>({ fullName: '', email: '', phone: '', location: '', agreeToTerms: false });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let deviceId = localStorage.getItem(LS_KEY_DEVICE_ID);
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem(LS_KEY_DEVICE_ID, deviceId);
    }
    setCurrentDeviceId(deviceId);
  }, []);

  // --- THIS IS THE MAIN CHANGE - The handleSubmit function is now much simpler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    // Your form validation can stay
    // if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Call the registerUser function from our provider instead of fetching to Basin
      const response = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        deviceId: currentDeviceId,
      });

      if (!response.success) {
        throw new Error(response.message || 'Registration failed. Please try again.');
      }
      
      // On success, close the form and show a success message
      onClose();
      setShowSuccessModal(true);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmissionError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // The rest of your component (handleInputChange, modals, JSX) can remain exactly the same.
  // The only logic that needed to change was the handleSubmit function.
  // For brevity, I am omitting the rest of your component's JSX. 
  
  // (Paste the rest of your component's code here, from your handleInputChange function down to the end)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Your SuccessModal, CongratsModal, and the main return() JSX do not need to change.
  // Just make sure your main <form> element has `onSubmit={handleSubmit}`.
  return (
      <>
          {/* Your existing CongratsModal and SuccessModal JSX */}
          <AnimatePresence>
              {isOpen && (
                  <motion.div>
                      {/* Your entire registration modal JSX goes here. */}
                  </motion.div>
              )}
          </AnimatePresence>
      </>
  );
};

export default CompetitionModal;
