import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import DashboardErrorState from "@/components/dashboard/DashboardErrorState";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useUserRole } from "@/hooks/useUserRole";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const Dashboard = () => {
  const {
    activeTab,
    setActiveTab,
    isLoading,
    error,
    leads,
    metrics,
    loadDashboardData,
    deleteLead,
    addLead,
    isPro,
  } = useDashboardData();
  
  const { trackEvent } = useAnalytics();
  const { isAdmin, loading: roleLoading } = useUserRole();
  
  // Track dashboard page view ONCE on mount only
  useEffect(() => {
    trackEvent('dashboard_view', {
      category: 'Dashboard',
      label: isPro ? 'Pro Dashboard' : 'Standard Dashboard',
      customDimensions: {
        is_pro_user: isPro
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only track once on mount

  // Simplified animation variant
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-aura-darkBg pb-16 relative overflow-hidden">
      {/* Background effects with further reduced intensity */}
      <DashboardBackground />
      
      <NavBar />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 pt-24 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={!isLoading && !roleLoading ? "visible" : "hidden"}
      >
        {/* Admin Badge */}
        {isAdmin && (
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 flex items-center gap-1.5 px-3 py-1">
              <Shield className="h-3.5 w-3.5" />
              Admin Access
            </Badge>
          </div>
        )}
        
        <DashboardTopbar 
          onRefresh={loadDashboardData} 
          isPro={isPro} 
          onAddLead={addLead}
        />
        
        {isLoading ? (
          <DashboardSkeleton />
        ) : error ? (
          <DashboardErrorState error={error} onRetry={loadDashboardData} />
        ) : (
          <DashboardContent 
            leads={leads} 
            metrics={metrics} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onDeleteLead={deleteLead}
            isPro={isPro}
            isAdmin={isAdmin} 
          />
        )}
      </motion.div>
      
      {/* Keep the Toaster component here to handle toast notifications */}
      <Toaster />
    </div>
  );
};

export default Dashboard;
