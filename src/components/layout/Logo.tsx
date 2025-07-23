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
    small: 'h-12 md:h-14 w-auto max-w-none',
    medium: 'h-14 md:h-16 w-auto max-w-none',
    large: 'h-16 md:h-20 w-auto max-w-none'
  };

  // Mobile word logo sizes - reduced from previous
  const mobileWordLogoSizes = {
    small: 'h-8 w-auto max-w-none',
    medium: 'h-10 w-auto max-w-none',
    large: 'h-12 w-auto max-w-none'
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* RB Icon Logo */}
      <div className={`${iconSizes[size]} flex-shrink-0`}>
        <img 
          src="/RB LOGO NEW.png" 
          alt="RB Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* RB Text Logo - Desktop */}
      <div className={`${desktopWordLogoSizes[size]} flex-shrink-0 hidden md:block`}>
        <img 
          src="/rb_text_f.png" 
          alt="RecklessBear" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* RB Text Logo - Mobile (smaller) */}
      <div className={`${mobileWordLogoSizes[size]} flex-shrink-0 block md:hidden`}>
        <img 
          src="/rb_text_mobile_f.png" 
          alt="RB" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Logo;