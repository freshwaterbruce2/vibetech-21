import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define the gtag function since it's added via a script tag
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set' | 'js',
      action: string,
      params?: any
    ) => void;
    dataLayer: any[];
  }
}

type EventOptions = {
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  customDimensions?: Record<string, string | number | boolean>;
}

/**
 * Enhanced hook to track page views and send events to Google Analytics
 */
export const useAnalytics = () => {
  const location = useLocation();
  
  // Track page views
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-TCZZ9JFEKN', {
        page_path: location.pathname + location.search
      });
      console.log('📊 Analytics: Page view tracked', location.pathname);
    }
  }, [location]);
  
  // Function to track custom events with enhanced options
  const trackEvent = (
    eventName: string, 
    options: EventOptions
  ) => {
    if (typeof window.gtag !== 'undefined') {
      const eventParams = {
        event_category: options.category,
        event_label: options.label,
        value: options.value,
        non_interaction: options.nonInteraction || false,
        ...options.customDimensions
      };
      
      window.gtag('event', eventName, eventParams);
      console.log('📊 Analytics: Event tracked', eventName, eventParams);
    }
  };
  
  // Convenience functions for common events
  const trackServiceView = (serviceId: string, serviceName: string) => {
    trackEvent('service_view', {
      category: 'Services',
      label: serviceName,
      customDimensions: { service_id: serviceId }
    });
  };
  
  const trackButtonClick = (buttonName: string, location: string) => {
    trackEvent('button_click', {
      category: 'Engagement',
      label: buttonName,
      customDimensions: { location: location }
    });
  };
  
  const trackFeatureInteraction = (featureName: string, action: string) => {
    trackEvent('feature_interaction', {
      category: 'Features',
      label: featureName,
      customDimensions: { action: action }
    });
  };
  
  // Dashboard-specific tracking functions
  const trackDashboardTabChange = (tabName: string) => {
    trackEvent('dashboard_tab_change', {
      category: 'Dashboard',
      label: tabName,
      customDimensions: { tab_name: tabName }
    });
  };
  
  const trackLeadAction = (action: string, leadData?: { id: number; name: string }) => {
    trackEvent('lead_action', {
      category: 'Dashboard',
      label: action,
      customDimensions: { 
        action,
        lead_id: leadData?.id,
        lead_name: leadData?.name
      }
    });
  };
  
  const trackDashboardMetricView = (metricName: string) => {
    trackEvent('dashboard_metric_view', {
      category: 'Dashboard',
      label: metricName,
      nonInteraction: true, // This is a passive/auto-triggered event
      customDimensions: { metric_name: metricName }
    });
  };
  
  return { 
    trackEvent,
    trackServiceView,
    trackButtonClick,
    trackFeatureInteraction,
    // Dashboard-specific tracking
    trackDashboardTabChange,
    trackLeadAction,
    trackDashboardMetricView
  };
};
