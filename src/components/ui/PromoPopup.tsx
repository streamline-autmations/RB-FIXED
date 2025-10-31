import React, { useEffect, useMemo, useState } from 'react';

const POPUP_DELAY_MS = 3500; // 3.5 seconds
const SESSION_FLAG_KEY = 'promo_popup_seen';

const PromoPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_FLAG_KEY) === '1';
    const determineIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Tailwind lg breakpoint
    };
    determineIsMobile();
    window.addEventListener('resize', determineIsMobile);

    let timer: number | undefined;
    if (!alreadyShown) {
      timer = window.setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem(SESSION_FLAG_KEY, '1');
      }, POPUP_DELAY_MS);
    }

    return () => {
      window.removeEventListener('resize', determineIsMobile);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const imageSrc = useMemo(() => {
    return isMobile ? '/mobile-pop-up.webp' : '/desktop-pop-up.webp';
  }, [isMobile]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close promo"
        onClick={() => setVisible(false)}
        className="absolute inset-0 bg-black/70"
      />

      {/* Content */}
      <div className="relative mx-4">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute -top-3 -right-3 bg-white/90 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow"
        >
          ×
        </button>

        {/* Image wrapper with responsive sizing */}
        <div
          className={
            isMobile
              ? 'w-[min(90vw,420px)]' // scale for mobile viewport
              : 'w-[min(90vw,640px)]' // desktop square up to 640
          }
        >
          <img
            src={imageSrc}
            alt="Promotion"
            className={
              isMobile
                ? 'w-full h-auto rounded-lg shadow-lg'
                : 'w-full aspect-square object-cover rounded-lg shadow-lg'
            }
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;


