import { memo } from "react";
import PageHeader from "@/components/ui/page-header";
import { motion } from "framer-motion";
import { Briefcase, Clock, Heart, Users } from "lucide-react";
import { portfolioStats } from "./projectsData";

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const StatItem = memo(({ icon, value, label }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center p-4 glass-card rounded-xl border border-primary/20"
  >
    <div className="text-primary mb-2">{icon}</div>
    <span className="text-2xl font-bold text-foreground">{value}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </motion.div>
));
StatItem.displayName = "StatItem";

const PortfolioHeroSection = memo(() => {
  return (
    <section className="pt-28 pb-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <PageHeader 
          title="Our Portfolio" 
          subtitle="Explore our collection of projects spanning web development, mobile applications, and custom software solutions." 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.7 }} 
          className="mt-8 text-center"
        >
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Each project represents our commitment to innovative design, cutting-edge technology, 
            and exceptional user experiences. Browse our showcase to see how we transform ideas into reality.
          </p>
        </motion.div>

        {/* December 2025 Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatItem 
            icon={<Briefcase className="h-6 w-6" />} 
            value={portfolioStats.projectsCompleted} 
            label="Projects Completed" 
          />
          <StatItem 
            icon={<Heart className="h-6 w-6" />} 
            value={portfolioStats.clientSatisfaction} 
            label="Client Satisfaction" 
          />
          <StatItem 
            icon={<Clock className="h-6 w-6" />} 
            value={portfolioStats.avgLoadTime} 
            label="Avg Load Time" 
          />
          <StatItem 
            icon={<Users className="h-6 w-6" />} 
            value={portfolioStats.repeatClients} 
            label="Repeat Clients" 
          />
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-24 left-10 w-24 h-24 rounded-full bg-primary/5 blur-xl"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-accent/5 blur-xl"></div>
    </section>
  );
});
PortfolioHeroSection.displayName = "PortfolioHeroSection";

export default PortfolioHeroSection;