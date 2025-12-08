
import { Lead, DashboardMetrics } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useNotifications } from "@/context/NotificationsContext";
import { toast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";

export const useLeadActions = (
  leads: Lead[], 
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>, 
  setMetrics: React.Dispatch<React.SetStateAction<DashboardMetrics>>
) => {
  const { addNotification } = useNotifications();
  const { trackLeadAction } = useAnalytics();

  const deleteLead = async (leadId: string) => {
    try {
      const leadToDelete = leads.find(lead => lead.id === leadId);
      
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);
      
      if (error) throw error;
      
      const updatedLeads = leads.filter(lead => lead.id !== leadId);
      setLeads(updatedLeads);
      
      setMetrics(prev => ({
        ...prev,
        totalLeads: prev.totalLeads - 1
      }));
      
      if (leadToDelete) {
        trackLeadAction('delete_success', { 
          id: leadToDelete.id, 
          name: leadToDelete.name 
        });
      }
      
      toast({
        title: "Lead deleted",
        description: "The lead has been successfully removed.",
      });
      
      addNotification({
        title: "Lead Deleted",
        message: "Lead has been successfully removed from your dashboard.",
        type: "info"
      });
      
      return true;
    } catch (error) {
      console.error("Failed to delete lead:", error);
      
      trackLeadAction('delete_error', { 
        id: leadId,
        name: "Unknown"
      });
      
      toast({
        variant: "destructive",
        title: "Error deleting lead",
        description: "Could not delete the lead. Please try again."
      });
      
      return false;
    }
  };

  const addLead = async (leadData: { 
    name: string; 
    email: string; 
    phone?: string;
    company?: string;
    service_interest?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          company: leadData.company || null,
          service_interest: leadData.service_interest || null,
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      const newLead: Lead = data;
      setLeads(prevLeads => [newLead, ...prevLeads]);
      
      setMetrics(prev => ({
        ...prev,
        totalLeads: prev.totalLeads + 1,
        newLeadsToday: prev.newLeadsToday + 1
      }));
      
      trackLeadAction('add_success', { 
        id: newLead.id, 
        name: leadData.name 
      });
      
      addNotification({
        title: "New Lead Added",
        message: `${leadData.name} has been added as a new lead.`,
        type: "success"
      });
      
      toast({
        title: "Lead added",
        description: `${leadData.name} has been added successfully.`,
      });
      
      return true;
    } catch (error) {
      console.error("Failed to add lead:", error);
      
      trackLeadAction('add_error', { 
        id: "0",
        name: "Unknown"
      });
      
      toast({
        variant: "destructive",
        title: "Error adding lead",
        description: "Could not add the lead. Please try again."
      });
      
      return false;
    }
  };

  return { deleteLead, addLead };
};
