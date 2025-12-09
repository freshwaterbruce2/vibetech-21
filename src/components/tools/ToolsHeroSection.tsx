
import React, { memo } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/page-header";
import ToolCard, { ToolCardProps } from "./ToolCard";
import { aggregateStats } from "./toolsData";
import { Layers, Users, Activity, Calendar } from "lucide-react";

interface ToolsHeroSectionProps {
  toolsData: ToolCardProps[];
}

const StatBadge = memo(({ icon: Icon, label, value }: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number 
}) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/30 border border-border/30 backdrop-blur-sm">
    <Icon className="h-4 w-4 text-aura-accent" />
    <div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  </div>
));
StatBadge.displayName = "StatBadge";

const MemoizedToolCard = memo(ToolCard);

const ToolsHeroSection: React.FC<ToolsHeroSectionProps> = memo(({ toolsData }) => {
  return (
    <section className="pt-28 pb-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <PageHeader 
          title="AI-Powered Tools & Integrations"
          subtitle="Enterprise-grade tools enhanced with AI agents, edge computing, and real-time analytics. Built for 2025 and beyond."
          className="text-foreground"
        />

        {/* Aggregate Stats */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatBadge icon={Layers} label="Total Integrations" value={aggregateStats.totalIntegrations} />
          <StatBadge icon={Users} label="Active Clients" value={aggregateStats.activeClients} />
          <StatBadge icon={Activity} label="Avg Uptime" value={aggregateStats.avgUptime} />
          <StatBadge icon={Calendar} label="Updated" value={aggregateStats.lastUpdated} />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsData.map((tool, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <MemoizedToolCard {...tool} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ToolsHeroSection.displayName = "ToolsHeroSection";

export default ToolsHeroSection;
