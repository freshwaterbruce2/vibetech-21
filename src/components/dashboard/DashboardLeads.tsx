
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Building2, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Lead } from "@/hooks/dashboard/types";
import { format } from "date-fns";

interface DashboardLeadsProps {
  leads: Lead[];
  onDeleteLead?: (id: string) => void;
}

const DashboardLeads = ({ leads, onDeleteLead }: DashboardLeadsProps) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const { trackLeadAction } = useAnalytics();
  
  const handleDeleteClick = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    setLeadToDelete(leadId);
    setDeleteConfirmOpen(true);
    
    // Track the delete attempt
    if (lead) {
      trackLeadAction('delete_attempt', { id: lead.id, name: lead.name });
    }
  };

  const handleConfirmDelete = () => {
    if (leadToDelete !== null && onDeleteLead) {
      const lead = leads.find(l => l.id === leadToDelete);
      onDeleteLead(leadToDelete);
      
      // Track the confirmed deletion
      if (lead) {
        trackLeadAction('delete_confirm', { id: lead.id, name: lead.name });
      }
    }
    setDeleteConfirmOpen(false);
    setLeadToDelete(null);
  };

  return (
    <>
      <Card className="bg-aura-backgroundLight border-aura-accent/10">
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>Manage and track your potential customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-aura-accent/10">
                  <th className="text-left py-3 px-2 font-medium text-aura-textSecondary">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-aura-textSecondary">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-aura-textSecondary">Company</th>
                  <th className="text-left py-3 px-2 font-medium text-aura-textSecondary">Interest</th>
                  <th className="text-left py-3 px-2 font-medium text-aura-textSecondary">Date</th>
                  <th className="text-left py-3 px-2 font-medium text-aura-textSecondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-aura-textSecondary">
                      No leads yet. Add your first lead to get started.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-aura-accent/5 hover:bg-aura-accent/5">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {lead.company_logo && (
                            <img src={lead.company_logo} alt="" className="w-6 h-6 rounded" />
                          )}
                          <span>{lead.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">{lead.email}</td>
                      <td className="py-3 px-2">
                        {lead.company ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Building2 className="h-3 w-3" />
                            {lead.company}
                          </div>
                        ) : (
                          <span className="text-aura-textSecondary">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        {lead.service_interest ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {lead.service_interest}
                          </span>
                        ) : (
                          <span className="text-aura-textSecondary">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(lead.created_at), 'MMM d, yyyy')}
                        </div>
                      </td>
                    <td className="py-3 px-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => handleDeleteClick(lead.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">Previous</Button>
          <div className="text-sm text-aura-textSecondary">
            Page 1 of 1
          </div>
          <Button variant="outline" size="sm">Next</Button>
        </CardFooter>
      </Card>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent className="bg-aura-backgroundLight border-aura-accent/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-aura-textSecondary">
              This action cannot be undone. This will permanently delete the lead and remove it from your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-aura-backgroundDark text-white hover:bg-aura-backgroundLight">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DashboardLeads;
