
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lead } from "@/hooks/dashboard/types";
import { format } from "date-fns";

interface DashboardOverviewProps {
  recentLeads: Lead[];
}

const DashboardOverview = ({ recentLeads }: DashboardOverviewProps) => {
  return (
    <Card className="bg-aura-backgroundLight border-aura-accent/10">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your CRM activity from the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentLeads.length === 0 ? (
            <div className="text-center py-6 text-aura-textSecondary">
              No leads yet. Add your first lead to get started.
            </div>
          ) : (
            recentLeads.slice(0, 3).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between border-b border-aura-accent/10 pb-2">
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-aura-textSecondary">{lead.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  {lead.service_interest && (
                    <span className="text-xs bg-aura-accent/10 text-aura-accent px-2 py-1 rounded-full">
                      {lead.service_interest}
                    </span>
                  )}
                  <span className="text-xs text-aura-textSecondary">
                    {format(new Date(lead.created_at), 'MMM d')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View All Activity</Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardOverview;
