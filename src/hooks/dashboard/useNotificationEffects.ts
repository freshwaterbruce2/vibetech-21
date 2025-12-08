import { useEffect, useRef } from "react";
import { useNotifications } from "@/context/NotificationsContext";

export const useNotificationEffects = (
  isInitialLoadRef: React.MutableRefObject<boolean>,
  dataLoadedRef: React.MutableRefObject<boolean>,
  loadDashboardData: () => Promise<void>
) => {
  const { addNotification } = useNotifications();
  const hasInitialized = useRef(false);
  const hasShownWelcome = useRef(false);
  const hasShownLeadUpdate = useRef(false);
  
  // Initial data load effect - only run once on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    
    if (!dataLoadedRef.current) {
      loadDashboardData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Welcome notification - only show once on mount
  useEffect(() => {
    if (hasShownWelcome.current) return;
    if (!isInitialLoadRef.current) return;
    
    hasShownWelcome.current = true;
    
    const timeoutId = setTimeout(() => {
      addNotification({
        title: "Welcome to Pro Dashboard",
        message: "You now have access to enhanced features and performance.",
        type: "info"
      });
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Lead qualification notification - show once after data loads
  useEffect(() => {
    if (hasShownLeadUpdate.current) return;
    if (isInitialLoadRef.current) return;
    if (!dataLoadedRef.current) return;
    
    hasShownLeadUpdate.current = true;
    
    const timeoutId = setTimeout(() => {
      addNotification({
        title: "Lead Status Updated",
        message: "Bob Johnson has been marked as 'Qualified'",
        type: "success"
      });
    }, 5000);
    
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
