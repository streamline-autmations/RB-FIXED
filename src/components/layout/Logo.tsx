import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'white' | 'black';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', color = 'white' }) => {
  // Icon sizes - keep current sizes
  const iconSizes = {
    small: 'h-8 md:h-10',
    medium: 'h-10 md:h-12',
    large: 'h-12 md:h-16'
  };

  // Desktop word logo sizes - reduced from previous
  const desktopWordLogoSizes = {
    small: 'h-12 md:h-14',
    medium: 'h-14 md:h-16',
    large: 'h-16 md:h-20'
  };

  // Mobile word logo sizes - reduced from previous
  const mobileWordLogoSizes = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-12'
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* RB Icon Logo */}
      <img 
        src="/RB LOGO NEW.png" 
        alt="RB Logo" 
        className={`${iconSizes[size]} w-auto max-w-none object-contain flex-shrink-0`}
      />
      
      {/* RB Text Logo - Desktop */}
      <img 
        src="/rb_text_f.png" 
        alt="RecklessBear" 
        className={`${desktopWordLogoSizes[size]} w-auto max-w-none object-contain flex-shrink-0 hidden md:block`}
      />
      
      {/* RB Text Logo - Mobile (smaller) */}
      <img 
        src="/rb_text_mobile_f.png" 
        alt="RB" 
        className={`${mobileWordLogoSizes[size]} w-auto max-w-none object-contain flex-shrink-0 block md:hidden`}
      />
    </div>
  );
};

export default Logo;
