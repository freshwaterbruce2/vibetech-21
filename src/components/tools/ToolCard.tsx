
import React, { memo } from "react";
import FuturisticCard from "@/components/ui/futuristic-card";
import { motion } from "framer-motion";
import { TrendingUp, Zap } from "lucide-react";
import { ToolStats } from "./types";

export interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  tools: string[];
  variant?: "blue" | "purple" | "teal";
  stats?: ToolStats;
  trending?: boolean;
  badge?: string;
}

const StatItem = memo(({ label, value }: { label: string; value: string | number }) => (
  <div className="text-center">
    <div className="text-lg font-bold text-aura-accent">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
));
StatItem.displayName = "StatItem";

const ToolCard = memo(({ 
  title, 
  description, 
  icon, 
  category, 
  tools, 
  variant = "blue",
  stats,
  trending,
  badge
}: ToolCardProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <FuturisticCard className="h-full" variant={variant}>
      <div className="flex flex-col h-full">
        <div className="mb-4 flex items-start justify-between">
          <div className="p-3 rounded-lg bg-aura-backgroundLight/50">
            {icon}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs uppercase tracking-wider text-aura-accent/70">
              {category}
            </span>
            {trending && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                <TrendingUp className="h-3 w-3" />
                Trending
              </span>
            )}
          </div>
        </div>

        {badge && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-aura-accent/20 text-aura-accent border border-aura-accent/30">
              <Zap className="h-3 w-3" />
              {badge}
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-3 font-heading text-foreground">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">
          {description}
        </p>

        {stats && (
          <div className="grid grid-cols-3 gap-2 mb-4 py-3 px-2 rounded-lg bg-background/30 border border-border/20">
            <StatItem label="Integrations" value={stats.integrations} />
            <StatItem label="Active Users" value={stats.activeUsers} />
            <StatItem label="Uptime" value={stats.uptime} />
          </div>
        )}
        
        <div className="mt-auto">
          <h4 className="text-sm font-semibold mb-2 text-aura-accent">Featured Tools</h4>
          <motion.ul 
            className="space-y-1"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {tools.map((tool, index) => (
              <motion.li 
                key={index} 
                className="text-sm text-muted-foreground flex items-center"
                variants={item}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-aura-accent mr-2"></span>
                {tool}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </FuturisticCard>
  );
});

ToolCard.displayName = "ToolCard";

export default ToolCard;
