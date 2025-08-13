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

  // --- REVERTED TO BASIN SUBMISSION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Using the Basin endpoint you provided
    const basinEndpoint = "https://usebasin.com/f/864d943995d8";
    
    // Basin works best with FormData
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
  // --- END REVERT ---

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleShare = (platform: 'facebook' | 'whatsapp' | 'instagram') => {
    const shareUrl = "http://www.recklessbear.co.za";
    const shareText = `I've entered the RecklessBear R10,000 competition! 醇 Find all 5 hidden golden logos to enter. Can you find them all?`;
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
          <motion.div className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md border border-yellow-500/30" initial={{ opacity: 0
