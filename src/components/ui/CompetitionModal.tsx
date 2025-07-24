import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

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

interface SubmissionResponse {
  success?: boolean;
  error?: string;
}

const CompetitionModal: React.FC<CompetitionModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    agreeToTerms: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResponse | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionResult(null);
    
    try {
      // Placeholder API call
      const response = await fetch('/api/submit-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result: SubmissionResponse = await response.json();
      setSubmissionResult(result);
      
      // If successful, reset form
      if (result.success) {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          agreeToTerms: false
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionResult({ error: 'network' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getResultMessage = () => {
    if (!submissionResult) return null;
    
    if (submissionResult.success) {
      return (
        <div className="text-center p-4 bg-green-900/50 border border-green-500 rounded-lg mb-6">
          <p className="text-green-200 text-lg">🎉 You're in! Happy hunting 😉</p>
        </div>
      );
    }
    
    if (submissionResult.error === 'duplicate') {
      return (
        <div className="text-center p-4 bg-red-900/50 border border-red-500 rounded-lg mb-6">
          <p className="text-red-200 text-lg">❌ You've already entered. Only one entry allowed per person.</p>
        </div>
      );
    }
    
    return (
      <div className="text-center p-4 bg-red-900/50 border border-red-500 rounded-lg mb-6">
        <p className="text-red-200 text-lg">❌ Something went wrong. Please try again.</p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-red-500 transition-colors duration-200"
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
                🏆 Win a R10,000 Prize!
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                We've hidden 5 golden RecklessBear logos across our website. Find them all and stand a chance to win a R10,000 prize!
              </p>
            </div>

            {/* Result Message */}
            {getResultMessage()}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="competition-fullName" className="block text-white text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="competition-fullName"
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
                <label htmlFor="competition-email" className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="competition-email"
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
                <label htmlFor="competition-phone" className="block text-white text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="competition-phone"
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
                <label htmlFor="competition-location" className="block text-white text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="competition-location"
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
                  id="competition-terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-600 focus:ring-2"
                  required
                />
                <label htmlFor="competition-terms" className="text-white text-sm leading-relaxed">
                  I agree to the competition terms & conditions *
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-400 text-xs">{errors.agreeToTerms}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 bg-[#8B0000] text-white font-bebas text-lg tracking-wider rounded-lg transition-all duration-300 ${
                  isSubmitting 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:bg-red-700 hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Enter Competition'}
              </button>
            </form>

            {/* Fine Print */}
            <p className="text-gray-500 text-xs text-center mt-6 leading-relaxed">
              Competition ends 31 December 2025. Winner will be contacted via email. 
              Terms and conditions apply.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompetitionModal;