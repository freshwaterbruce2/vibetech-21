import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lead, DashboardMetrics } from "./types";
import { useNotifications } from "@/context/NotificationsContext";
import { toast } from "@/hooks/use-toast";

export const useRealtimeLeads = (
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>,
  setMetrics: React.Dispatch<React.SetStateAction<DashboardMetrics>>,
  isLoading: boolean
) => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Don't subscribe until initial load is complete
    if (isLoading) return;

    const channel = supabase
      .channel('leads-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          const newLead = payload.new as Lead;
          
          setLeads((prevLeads) => {
            // Avoid duplicates
            if (prevLeads.some(lead => lead.id === newLead.id)) {
              return prevLeads;
            }
            return [newLead, ...prevLeads];
          });

          setMetrics((prev) => ({
            ...prev,
            totalLeads: prev.totalLeads + 1,
            newLeadsToday: prev.newLeadsToday + 1
          }));

          addNotification({
            title: "New Lead!",
            message: `${newLead.name} just submitted a lead.`,
            type: "success"
          });

          toast({
            title: "New lead received",
            description: `${newLead.name} has been added to your dashboard.`,
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          const updatedLead = payload.new as Lead;
          
          setLeads((prevLeads) =>
            prevLeads.map((lead) =>
              lead.id === updatedLead.id ? updatedLead : lead
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          const deletedLead = payload.old as Lead;
          
          setLeads((prevLeads) =>
            prevLeads.filter((lead) => lead.id !== deletedLead.id)
          );

          setMetrics((prev) => ({
            ...prev,
            totalLeads: Math.max(0, prev.totalLeads - 1)
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isLoading, setLeads, setMetrics, addNotification]);
};
