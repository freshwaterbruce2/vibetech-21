import { memo, ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  stat?: string;
  trend?: string;
}

const ServiceCard = memo(({ title, description, icon, stat, trend }: ServiceCardProps) => {
  return (
    <div className="glass-card p-6 border border-primary/20 hover:border-primary/40 hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 font-heading bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {(stat || trend) && (
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          {stat && (
            <span className="text-sm font-medium text-foreground">{stat}</span>
          )}
          {trend && (
            <span className="text-xs text-primary flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
});
ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
