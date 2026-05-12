import { useState, useEffect } from 'react';

/**
 * Custom hook for handling responsive logic and mobile viewport fixes.
 */
export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Set a custom property for viewport height to fix mobile browser issues
      const vhValue = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vhValue}px`);
      setVh(vhValue);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, vh };
}
