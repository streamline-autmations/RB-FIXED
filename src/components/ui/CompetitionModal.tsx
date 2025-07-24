import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, Instagram, Share2 } from 'lucide-react';

interface CompetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  agreeToTerms: boolean;
}

// Local Storage Keys
const LS_KEY_REGISTERED = 'recklessbear_competition_registered';
const LS_KEY_DEVICE_ID = 'recklessbear_device_id';
const LS_KEY_REGISTERED_EMAIL = 'recklessbear_registered_email'; // New key to store registered email

const CompetitionModal: React.FC<CompetitionModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    agreeToTerms: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false); // New state to track device registration
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null); // New state for persistent device ID

  // --- NEW: Initialize persistent device ID and check registration status on component mount ---
  useEffect(() => {
    let deviceId = localStorage.getItem(LS_KEY_DEVICE_ID);
    if (!deviceId) {
      deviceId = crypto.randomUUID(); // Generate a truly unique ID for the device
      localStorage.setItem(LS_KEY_DEVICE_ID, deviceId);
    }
    setCurrentDeviceId(deviceId); // Store it in component state

    // Check if the device is already registered
    if (localStorage.getItem(LS_KEY_REGISTERED) === 'true') {
      setIsDeviceRegistered(true);
      setShowSuccessModal(true); // If already registered, immediately show success modal
    }
  }, []); // Run only once on mount

  // Hide chatbot widget on mobile when modal is open
  useEffect(() => {
    const chatbotWidget = document.getElementById('vg-widget-container');
    const chatbotButton = document.querySelector('.vg-bubble-button');
    const chatbotOverlay = document.getElementById('VG_OVERLAY_CONTAINER');
    
    // Determine if any competition modal is open (main form or success)
    const isAnyCompetitionModalOpen = isOpen || showSuccessModal;

    if (chatbotWidget) {
      chatbotWidget.style.display = isAnyCompetitionModalOpen ? 'none' : '';
    }
    
    if (chatbotButton) {
      (chatbotButton as HTMLElement).style.display = isAnyCompetitionModalOpen ? 'none' : '';
    }

    if (chatbotOverlay) {
      (chatbotOverlay as HTMLElement).style.display = isAnyCompetitionModalOpen ? 'none' : '';
    }

    // Cleanup on unmount (ensure chatbot reappears if component unmounts while hidden)
    return () => {
      if (chatbotWidget) {
        chatbotWidget.style.display = '';
      }
      if (chatbotButton) {
        (chatbotButton as HTMLElement).style.display = '';
      }
      if (chatbotOverlay) {
        (chatbotOverlay as HTMLElement).style.display = '';
      }
    };
  }, [isOpen, showSuccessModal]); // Depend on isOpen and showSuccessModal to react to changes

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // --- MODIFIED: Populate hidden device_id field with persistent ID ---
    const deviceIdField = document.getElementById('competition-device-id') as HTMLInputElement;
    if (deviceIdField && currentDeviceId) {
      deviceIdField.value = currentDeviceId; // Use the persistent device ID
    } else {
      console.error("Hidden device ID field or currentDeviceId not found.");
      // You might want to prevent submission or handle this error
      return; 
    }
    // --- END MODIFIED ---
    
    if (!validateForm()) {
      return;
    }
    
    // --- NEW: Set local storage flag for successful registration ---
    localStorage.setItem(LS_KEY_REGISTERED, 'true');
    localStorage.setItem(LS_KEY_REGISTERED_EMAIL, formData.email); // Store email for future use
    setIsDeviceRegistered(true); // Update state
    // --- END NEW ---

    // Show success modal and close main modal
    setIsSubmitted(true);
    setShowSuccessModal(true);
    onClose(); // Close the initial registration form modal
    
    // Reset form data for next potential use (e.g., if modal is reused)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      agreeToTerms: false
    });
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleShareSuccess = (platform: string) => {
    const shareUrl = window.location.origin;
    const shareText = "I found a hidden golden logo on RecklessBear's website and entered their R10,000 competition! 🏆 Can you find all 5 hidden logos?";
    
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
        // Note: alert() is generally not recommended in production React apps.
        // Consider a custom toast/notification message instead.
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Link copied to clipboard! Share it on Instagram.');
        return;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: 'RecklessBear Golden Logo Competition',
            text: shareText,
            url: shareUrl,
          });
          return;
        }
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  // Success Modal Component (This is your existing "YOU'RE REGISTERED!" modal)
  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && ( // This state now also controls if the device is already registered
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccessModal(false)}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-yellow-500 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            
            <div className="p-8 pt-8 text-center">
              {/* Golden Logo */}
              <div className="mb-6">
                <img 
                  src="/Golden-Logo.png" 
                  alt="Golden RecklessBear Logo" 
                  className="w-20 h-20 mx-auto mb-4 animate-pulse"
                />
                <motion.h2 
                  className="text-3xl md:text-4xl font-bebas text-yellow-400 mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  🏆 You're Registered!
                </motion.h2>
                <motion.p 
                  className="text-white text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  You've successfully registered to compete. If you find all 5 golden logos hidden throughout the site, you'll be entered into our wheel spin for a chance to win R10 000!
                </motion.p>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full py-3 px-6 bg-[#8B0000] text-white font-bebas text-lg tracking-wider rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Continue Hunting
              </motion.button>

              {/* Fine Print */}
              <motion.p 
                className="text-gray-500 text-xs text-center mt-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                Competition ends 28 August 2025. A live wheelspin will be done on RecklessBear's socials on 28 August. Winner will be announced during the stream.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // --- MODIFIED: Conditional rendering based on device registration status ---
  // If main modal is trying to open (isOpen is true) AND device is already registered,
  // we want to directly show the success modal.
  if (isOpen && isDeviceRegistered) {
    return <SuccessModal />;
  }
  // If the main modal is not open AND the success modal is not open, then render nothing.
  if (!isOpen && !showSuccessModal) return null;
  // --- END MODIFIED ---

  return (
    <>
      <SuccessModal /> {/* Always render SuccessModal, its own state controls visibility */}
      <AnimatePresence>
        {isOpen && !isDeviceRegistered && ( // Only show main form if it's open and device is NOT registered
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-yellow-500/30"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.1)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-yellow-500 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          
          <div className="p-8">
            {/* Golden Logo */}
            <div className="text-center mb-6">
              <img 
                src="/Golden-Logo.png" 
                alt="Golden RecklessBear Logo" 
                className="w-16 h-16 mx-auto mb-4"
              />
              <h2 className="text-2xl md:text-3xl font-bebas text-white mb-2">
                Stand a chance to win R10 000!
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Find all 5 golden logos hidden across the site and stand a chance to win R10 000.
              </p>
            </div>

            {/* Form */}
            <form 
              action="https://usebasin.com/f/caea1c883e3b"
              method="POST" 
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              {/* Hidden Device ID Field */}
              <input
                type="hidden"
                name="device_id"
                id="competition-device-id"
                value={currentDeviceId || ''} // Use the state variable for value
              />

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="full_name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.fullName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:border-red-600 focus:ring-red-600'
                  }`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email_address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:border-red-600 focus:ring-red-600'
                  }`}
                  placeholder="Enter your email address"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone_number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-600 focus:border-red-600 focus:ring-red-600'
                  }`}
                  placeholder="Enter your phone number"
                  required
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-white text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-red-600 focus:ring-red-600 transition-colors duration-200"
                  placeholder="Enter your location (optional)"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="terms_agreed"
                  value="true"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-600 focus:ring-2"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-white text-sm leading-relaxed">
                  I agree to the competition terms & conditions *
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-400 text-xs">{errors.agreeToTerms}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#8B0000] text-white font-bebas text-lg tracking-wider rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:scale-105"
              >
                Enter Competition
              </button>
            </form>

            {/* Fine Print */}
            <p className="text-gray-500 text-xs text-center mt-6 leading-relaxed">
              Competition ends 28 August 2025. A live wheelspin will be done on RecklessBear's socials on 28 August. Winner will be announced during the stream.
            </p>
          </div>
        </motion.div>
      </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompetitionModal;
export default CompetitionModal;

export default CompetitionModal;
