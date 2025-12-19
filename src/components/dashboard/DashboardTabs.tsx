
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Calendar, MessageSquare, Users, Shield, PieChart } from "lucide-react";
import DashboardOverview from "./DashboardOverview";
import DashboardLeads from "./DashboardLeads";
import DashboardEmptyState from "./DashboardEmptyState";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Lead } from "@/hooks/dashboard/types";
import AdminUserManagement from "./admin/AdminUserManagement";
import AdminAnalytics from "./admin/AdminAnalytics";
import AdminAllLeads from "./admin/AdminAllLeads";

interface DashboardTabsProps {
  leads: Lead[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onDeleteLead?: (id: string) => void;
  isAdmin?: boolean;
}

const DashboardTabs = ({ leads, activeTab, setActiveTab, onDeleteLead, isAdmin = false }: DashboardTabsProps) => {
  const { trackDashboardTabChange } = useAnalytics();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    trackDashboardTabChange(value);
  };

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="mb-8">
      <TabsList className={`grid ${isAdmin ? 'grid-cols-7' : 'grid-cols-4'} mb-6 bg-aura-darkBgLight border border-white/10`}>        
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        
        <TabsTrigger value="leads" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Leads</span>
        </TabsTrigger>
        
        <TabsTrigger value="messages" className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Messages</span>
        </TabsTrigger>
        
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Calendar</span>
        </TabsTrigger>

        {isAdmin && (
          <>
            <TabsTrigger value="admin-users" className="flex items-center gap-2 text-primary">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            
            <TabsTrigger value="admin-leads" className="flex items-center gap-2 text-primary">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">All Leads</span>
            </TabsTrigger>
            
            <TabsTrigger value="admin-analytics" className="flex items-center gap-2 text-primary">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </>
        )}
      </TabsList>
      
      <div className="relative">
        <TabsContent value="overview" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <DashboardOverview recentLeads={leads} />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="leads" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <DashboardLeads leads={leads} onDeleteLead={onDeleteLead} />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <DashboardEmptyState icon={MessageSquare} title="Customer Messages" description="When you receive messages, they'll appear here." />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <DashboardEmptyState icon={Calendar} title="Upcoming Events" description="Add events to see them appear on your calendar." />
          </motion.div>
        </TabsContent>

        {isAdmin && (
          <>
            <TabsContent value="admin-users" className="mt-0">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <AdminUserManagement />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="admin-leads" className="mt-0">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <AdminAllLeads />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="admin-analytics" className="mt-0">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <AdminAnalytics />
              </motion.div>
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default DashboardTabs;
