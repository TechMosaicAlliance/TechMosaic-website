import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Generate a visitor ID (stored in localStorage)
const getVisitorId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

// Generate a session ID (stored in sessionStorage)
const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export function usePageTracking() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page visit
    const trackPageVisit = async () => {
      try {
        const visitorId = getVisitorId();
        const sessionId = getSessionId();
        const referrer = document.referrer || '';
        const pageTitle = document.title || '';

        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pagePath: pathname,
            pageTitle,
            referrer,
            visitorId,
            sessionId,
          }),
        });
      } catch (error) {
        console.error('Error tracking page visit:', error);
      }
    };

    // Add a small delay to ensure the page has loaded
    const timer = setTimeout(trackPageVisit, 500);

    return () => clearTimeout(timer);
  }, [pathname]);
}

