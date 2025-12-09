
import React, { memo } from "react";
import PageHeader from "@/components/ui/page-header";
import { serviceStats } from "./servicesData";
import { Users, Briefcase, Star, Calendar } from "lucide-react";

const StatItem = memo(({ icon: Icon, value, label }: { icon: React.ElementType; value: string | number; label: string }) => (
  <div className="flex flex-col items-center p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/20">
    <Icon className="h-5 w-5 text-primary mb-2" />
    <span className="text-2xl font-bold text-foreground">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
));
StatItem.displayName = 'StatItem';

const ServicesHeader = () => {
  return (
    <div className="mb-12">
      <PageHeader 
        title="Our Services"
        subtitle="Cutting-edge technology solutions powered by AI agents, edge computing, and cloud-native architecture. Updated for 2025."
        className="text-white"
      />
      
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
        <StatItem icon={Users} value={`${serviceStats.totalClients}+`} label="Happy Clients" />
        <StatItem icon={Briefcase} value={`${serviceStats.totalProjects}+`} label="Projects Delivered" />
        <StatItem icon={Star} value={`${serviceStats.avgSatisfaction}%`} label="Satisfaction Rate" />
        <StatItem icon={Calendar} value={`${serviceStats.yearsExperience} yrs`} label="Experience" />
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-4">
        Stats as of {serviceStats.lastUpdated}
      </p>
    </div>
  );
};

export default memo(ServicesHeader);