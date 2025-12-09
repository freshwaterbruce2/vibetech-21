
import React, { memo } from "react";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/ui/page-header";
import { motion } from "framer-motion";
import { Users, TrendingUp, Star, Sparkles } from "lucide-react";
import { pricingStats } from "./pricingData";

interface PricingHeaderProps {
  billingCycle: "monthly" | "yearly";
  setBillingCycle: (cycle: "monthly" | "yearly") => void;
}

const StatBadge = memo(({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/30 backdrop-blur-sm border border-border/20">
    <Icon className="h-4 w-4 text-primary" />
    <span className="text-sm font-medium text-foreground">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
));
StatBadge.displayName = 'StatBadge';

const PricingHeader = memo(({ billingCycle, setBillingCycle }: PricingHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <PageHeader
        title="AI-Powered Pricing for 2025"
        subtitle="Get enterprise-grade AI features at startup-friendly prices. Our plans include AI agents, automation, and dedicated support."
        className="text-white"
      />
      
      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <StatBadge icon={Users} value={`${pricingStats.totalCustomers.toLocaleString()}+`} label="customers" />
        <StatBadge icon={TrendingUp} value={pricingStats.avgSavings} label="avg savings" />
        <StatBadge icon={Star} value={`${pricingStats.satisfactionRate}%`} label="satisfaction" />
      </div>
      
      {/* Value proposition */}
      <div className="flex justify-center mb-8">
        <Badge variant="outline" className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          AI features included in all plans — no hidden fees
        </Badge>
      </div>
      
      {/* Billing toggle with savings indicator */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <span className={`mr-3 ${billingCycle === "monthly" ? "text-white font-medium" : "text-white/70"}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-accent focus-visible:ring-offset-2 ${
              billingCycle === "yearly" ? "bg-aura-accent" : "bg-aura-textSecondary/30"
            }`}
            aria-label={`Switch to ${billingCycle === "monthly" ? "yearly" : "monthly"} billing`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`ml-3 flex items-center ${billingCycle === "yearly" ? "text-white font-medium" : "text-white/70"}`}>
            Yearly 
            <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Save 23%</Badge>
          </span>
        </div>
        
        {billingCycle === "yearly" && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-emerald-400"
          >
            You're saving up to $720 per year!
          </motion.p>
        )}
      </div>
      
      <p className="text-center text-xs text-muted-foreground mt-6">
        Pricing as of {pricingStats.lastUpdated}
      </p>
    </motion.div>
  );
});

PricingHeader.displayName = 'PricingHeader';

export default PricingHeader;