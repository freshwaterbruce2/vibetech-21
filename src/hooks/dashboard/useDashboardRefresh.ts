
import { useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNotifications } from "@/context/NotificationsContext";
import { toast } from "@/hooks/use-toast";
import { Lead, DashboardMetrics } from "./types";

export const useDashboardRefresh = (
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
  setMetrics: React.Dispatch<React.SetStateAction<DashboardMetrics>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const isInitialLoadRef = useRef(true);
  const isManualRefreshRef = useRef(false);
  const dataLoadedRef = useRef(false);
  const { addNotification } = useNotifications();
  
  const loadDashboardData = useCallback(async () => {
    if (!isInitialLoadRef.current) {
      isManualRefreshRef.current = true;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch leads from Supabase
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (leadsError) throw leadsError;
      
      const leads: Lead[] = leadsData || [];
      setLeads(leads);
      
      // Calculate metrics from real data
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const newLeadsToday = leads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate >= today;
      }).length;
      
      // Calculate conversion rate (leads with enriched data / total)
      const enrichedLeads = leads.filter(lead => lead.enriched_at).length;
      const conversionRate = leads.length > 0 
        ? `${((enrichedLeads / leads.length) * 100).toFixed(1)}%` 
        : "0%";
      
      setMetrics({
        totalLeads: leads.length,
        newLeadsToday,
        conversionRate,
        avgResponseTime: "< 1 hour"
      });
      
      dataLoadedRef.current = true;
      
      if (!isInitialLoadRef.current && isManualRefreshRef.current) {
        addNotification({
          title: "Dashboard Updated",
          message: "Your dashboard data has been refreshed",
          type: "success"
        });

        toast({
          title: "Dashboard refreshed",
          description: "Your dashboard data has been updated successfully.",
        });
        
        isManualRefreshRef.current = false;
      }
      
      isInitialLoadRef.current = false;
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
      
      if (!isInitialLoadRef.current && isManualRefreshRef.current) {
        toast({
          variant: "destructive",
          title: "Error loading dashboard",
          description: "Could not load your dashboard data. Please try again.",
        });
        
        addNotification({
          title: "Dashboard Error",
          message: "Failed to load dashboard data. Please try again.",
          type: "error"
        });
        
        isManualRefreshRef.current = false;
      }
      
      isInitialLoadRef.current = false;
    } finally {
      setIsLoading(false);
    }
  }, [addNotification, setError, setIsLoading, setLeads, setMetrics]);

  return { loadDashboardData, isInitialLoadRef, dataLoadedRef };
};
