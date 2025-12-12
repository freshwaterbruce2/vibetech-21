import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Cookie, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const COOKIE_CONSENT_KEY = 'vibe-tech-cookie-consent';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay before showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(onlyEssential);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      preferences: prefs,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    
    // Here you would typically initialize/disable analytics based on preferences
    if (prefs.analytics && typeof window.gtag !== 'undefined') {
      // Update analytics consent
      (window.gtag as Function)('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Cannot toggle essential cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass-card p-6 border border-primary/20">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Cookie Preferences</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={handleRejectAll}
                aria-label="Close cookie banner"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-muted-foreground text-sm mb-4">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept All", you consent to our use of cookies. Read our{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{' '}
              for more information.
            </p>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 mb-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium text-foreground text-sm">Essential Cookies</h4>
                        <p className="text-xs text-muted-foreground">Required for website functionality</p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        Always On
                      </div>
                    </div>

                    <div 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => togglePreference('analytics')}
                    >
                      <div>
                        <h4 className="font-medium text-foreground text-sm">Analytics Cookies</h4>
                        <p className="text-xs text-muted-foreground">Help us understand how visitors use our site</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={preferences.analytics}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          preferences.analytics ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                            preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div 
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => togglePreference('marketing')}
                    >
                      <div>
                        <h4 className="font-medium text-foreground text-sm">Marketing Cookies</h4>
                        <p className="text-xs text-muted-foreground">Used to deliver relevant advertisements</p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={preferences.marketing}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          preferences.marketing ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                            preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                {showSettings ? 'Hide Settings' : 'Cookie Settings'}
              </Button>
              
              <div className="flex gap-3 sm:ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
                {showSettings ? (
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Preferences
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Accept All
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
