import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { useAnalytics } from './hooks/useAnalytics';
import AnimatedRoutes from './components/layout/AnimatedRoutes';
import CookieConsent from './components/CookieConsent';

// ScrollToTop component to handle scrolling to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Enhanced analytics tracker to track page navigation and performance metrics
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const { trackEvent } = useAnalytics();
  
  useEffect(() => {
    // Track initial page load time
    if (window.performance) {
      const pageLoadTime = Math.round(performance.now());
      
      trackEvent('page_performance', {
        category: 'Performance',
        label: location.pathname,
        value: pageLoadTime,
        customDimensions: {
          page_path: location.pathname,
          load_time_ms: pageLoadTime
        }
      });
    }
    
    // Track user session data
    const sessionId = localStorage.getItem('session_id') || 
      `session_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    if (!localStorage.getItem('session_id')) {
      localStorage.setItem('session_id', sessionId);
      
      // Track new session
      trackEvent('session_start', {
        category: 'User Sessions',
        customDimensions: {
          session_id: sessionId,
          is_new_session: true
        }
      });
    }
    
    // Set the session ID as a user property using the correct syntax
    if (typeof window.gtag !== 'undefined') {
      window.gtag('set', 'user_properties', {
        'session_id': sessionId
      });
    }
  }, [trackEvent, location.pathname]);
  
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <div className="dashboard-bg min-h-screen">
        <AnimatedRoutes />
        <Toaster />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
