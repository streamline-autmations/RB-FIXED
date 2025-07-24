import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Facebook, Twitter } from 'lucide-react';

interface GoldenLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoldenLogoModal: React.FC<GoldenLogoModalProps> = ({ isOpen, onClose }) => {
  const shareUrl = window.location.origin;
  const shareText = "I found a hidden golden logo on RecklessBear's website and entered their R10,000 competition! 🏆 Can you find all 5 hidden logos?";

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText} ${encodedUrl}`;
        break;
      default:
        // Generic share
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
          className="relative bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-yellow-500/30"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:text-yellow-500 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          
          <div className="p-8 text-center">
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
                🎉 Congratulations!
              </motion.h2>
              <motion.p 
                className="text-white text-lg leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                You've been entered into the draw to win <span className="text-yellow-400 font-bold">R10,000!</span>
              </motion.p>
              <motion.p 
                className="text-gray-300 text-base leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                The winner will be announced at the end of August — keep an eye on our socials.
              </motion.p>
              <motion.p 
                className="text-gray-300 text-base leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Share with your friends so they can also stand a chance to win!
              </motion.p>
            </div>

            {/* Social Share Buttons */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <h3 className="text-white font-bebas text-xl mb-4">Share the Hunt</h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Facebook size={20} />
                  Share on Facebook
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
                >
                  <Twitter size={20} />
                  Share on Twitter
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Share2 size={20} />
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => handleShare('generic')}
                  className="flex items-center justify-center gap-3 w-full py-3 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Share2 size={20} />
                  More Share Options
                </button>
              </div>
            </motion.div>

            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="mt-8 w-full py-3 px-6 bg-[#8B0000] text-white font-bebas text-lg tracking-wider rounded-lg transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Continue Hunting
            </motion.button>

            {/* Fine Print */}
            <motion.p 
              className="text-gray-500 text-xs text-center mt-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Competition ends 31 December 2025. Winner will be contacted via email. 
              Terms and conditions apply.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GoldenLogoModal;