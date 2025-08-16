import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, Instagram, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionProvider';

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
const LS_KEY_REGISTERED_EMAIL = 'recklessbear_registered_email';

const CompetitionModal: React.FC<CompetitionModalProps> = ({ isOpen, onClose, showCongrats, onCloseCongrats }) => {
  const { isDeviceRegistered, registerDevice } = useCompetition();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', phone: '', location: '', agreeToTerms: false
  });
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let deviceId = localStorage.getItem(LS_KEY_DEVICE_ID);
    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem(LS_KEY_DEVICE_ID, deviceId);
    }
    setCurrentDeviceId(deviceId);
  }, []);

  useEffect(() => {
    if (isOpen && isDeviceRegistered) {
      onClose();
      setShowSuccessModal(true);
    }
  }, [isOpen, isDeviceRegistered, onClose]);

  useEffect(() => {
    const chatbotWidget = document.getElementById('vg-widget-container');
    const isAnyModalOpen = isOpen || showSuccessModal || showCongrats;
    if (chatbotWidget) {
      chatbotWidget.style.display = isAnyModalOpen ? 'none' : '';
    }
  }, [isOpen, showSuccessModal, showCongrats]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);

    const basinEndpoint = "https://usebasin.com/f/864d943995d8";
    
    const dataToSend = new FormData();
    dataToSend.append('full_name', formData.fullName);
    dataToSend.append('email_address', formData.email);
    dataToSend.append('phone_number', formData.phone);
    dataToSend.append('location', formData.location);
    dataToSend.append('terms_agreed', String(formData.agreeToTerms));
    if (currentDeviceId) {
        dataToSend.append('device_id', currentDeviceId);
    }

    try {
      const response = await fetch(basinEndpoint, { 
          method: 'POST', 
          body: dataToSend 
      });

      if (!response.ok) {
        throw new Error(`Basin submission failed: ${response.status}`);
      }
      
      localStorage.setItem(LS_KEY_REGISTERED_EMAIL, formData.email);
      registerDevice();
      
      onClose();
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error submitting form to Basin:', error);
      setSubmissionError("Failed to register. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleShare = (platform: 'facebook' | 'whatsapp' | 'instagram') => {
    const shareUrl = "http://www.recklessbear.co.za";
    const shareText = `I've entered the RecklessBear R10,000 competition! 脂 Find all 5 hidden golden logos to enter. Can you find them all?`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        window.open(shareLink, '_blank', 'width=600,height=400');
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        window.open(shareLink, '_blank');
        break;
      case 'instagram':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000);
        }).catch(() => setCopySuccess('Error!'));
        break;
    }
  };

  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)} />
          <motion.div className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/30" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 z-10 p-2 text-white hover:text-yellow-500"><X size={24} /></button>
            <div className="px-8 pb-8 pt-12 text-center">
              <img src="/Golden-Logo.png" alt="Golden Logo" className="w-20 h-20 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bebas text-yellow-400 mb-4">You're Registered!</h2>
              <p className="text-white text-lg leading-relaxed mb-6">You've successfully registered to compete. Find all 5 golden logos to be entered into the final draw!</p>
              
              <p className="text-gray-300 text-sm mb-4">Share with friends so they can enter too!</p>
              <div className="flex flex-col space-y-4 mb-8">
                <button onClick={() => handleShare('facebook')} className="w-full py-3 px-6 bg-blue-600 text-white font-bebas text-lg rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"><Facebook size={20} className="mr-2" /> Share on Facebook</button>
                <div className="relative w-full">
                  <button onClick={() => handleShare('instagram')} className="w-full py-3 px-6 bg-pink-600 text-white font-bebas text-lg rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"><Instagram size={20} className="mr-2" /> Share on Instagram</button>
                  {copySuccess && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white bg-black/50 px-2 py-1 rounded">{copySuccess}</span>}
                </div>
                <button onClick={() => handleShare('whatsapp')} className="w-full py-3 px-6 bg-green-600 text-white font-bebas text-lg rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"><Share2 size={20} className="mr-2" /> Share on WhatsApp</button>
              </div>

              <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 px-6 bg-[#8B0000] text-white font-bebas text-lg rounded-lg hover:bg-red-700 transition-colors">Continue Hunting</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const CongratsModal = () => (
    <AnimatePresence>
      {showCongrats && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCloseCongrats} />
          <motion.div className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/30" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <button onClick={onCloseCongrats} className="absolute top-4 right-4 z-10 p-2 text-white hover:text-yellow-500"><X size={24} /></button>
            <div className="px-8 pb-8 pt-12 text-center">
              <img src="/Golden-Logo.png" alt="Golden Logo" className="w-20 h-20 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bebas text-yellow-400 mb-4">Congratulations!</h2>
              <p className="text-white text-lg leading-relaxed mb-6">You've been entered into the wheel spin to win R10,000!</p>
              <p className="text-gray-300 text-sm mb-4">Share with friends so they can enter too!</p>
              <div className="flex flex-col space-y-4 mb-6">
                <button onClick={() => handleShare('facebook')} className="w-full py-3 px-6 bg-blue-600 text-white font-bebas text-lg rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"><Facebook size={20} className="mr-2" /> Share on Facebook</button>
                <div className="relative w-full">
                  <button onClick={() => handleShare('instagram')} className="w-full py-3 px-6 bg-pink-600 text-white font-bebas text-lg rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"><Instagram size={20} className="mr-2" /> Share on Instagram</button>
                  {copySuccess && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-white bg-black/50 px-2 py-1 rounded">{copySuccess}</span>}
                </div>
                <button onClick={() => handleShare('whatsapp')} className="w-full py-3 px-6 bg-green-600 text-white font-bebas text-lg rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"><Share2 size={20} className="mr-2" /> Share on WhatsApp</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <CongratsModal />
      <SuccessModal />
      <AnimatePresence>
        {isOpen && !isDeviceRegistered && (
          <motion.div className="fixed inset-0 z-40 flex items-start justify-center p-4 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <motion.div className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto border border-yellow-500/30" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 text-white hover:text-yellow-500"><X size={24} /></button>
              <div className="p-8 pt-12">
                <div className="text-center mb-6">
                  <img src="/Golden-Logo.png" alt="Golden Logo" className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bebas text-white mb-2">Stand a chance to win R10 000!</h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">Find all 5 golden logos hidden across the site to enter the draw.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="device_id" id="competition-device-id" value={currentDeviceId || ''} />
                  <div>
                    <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">Full Name *</label>
                    <input type="text" id="fullName" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className={`w-full px-4 py-3 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-red-600 focus:ring-red-600'}`} required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address *</label>
                    <input type="email" id="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={`w-full px-4 py-3 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-red-600 focus:ring-red-600'}`} required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">Phone Number *</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={`w-full px-4 py-3 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-red-600 focus:ring-red-600'}`} required />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-white text-sm font-medium mb-2">Location (City / Town)</label>
                    <input type="text" id="location" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white border rounded-lg focus:outline-none focus:ring-2 border-gray-600 focus:border-red-600 focus:ring-red-600" />
                  </div>
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" id="agreeToTerms" checked={formData.agreeToTerms} onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)} className="mt-1 h-4 w-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-600" required />
                    <label htmlFor="agreeToTerms" className="text-white text-sm leading-relaxed">
                      I agree to the{' '}
                      <Link to="/competition-rules" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-400 transition-colors">
                        competition terms & conditions
                      </Link>
                      {' '}*
                    </label>
                  </div>
                  {errors.agreeToTerms && <p className="text-red-400 text-xs">{errors.agreeToTerms}</p>}
                  {submissionError && <p className="text-red-400 text-sm text-center">{submissionError}</p>}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-[#8B0000] text-white font-bebas text-lg rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Enter Competition'}
                  </button>
                </form>
                <p className="text-gray-500 text-xs text-center mt-6 leading-relaxed">Competition ends 28 August 2025.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompetitionModal;
