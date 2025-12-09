import React, { memo } from "react";
import { Sparkles, User, Zap, Shield, Leaf, Rocket, TrendingUp } from "lucide-react";
import { coreValues } from "./aboutData";
import type { CoreValue } from "./types";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-10 w-10 text-primary" />,
  User: <User className="h-10 w-10 text-primary" />,
  Zap: <Zap className="h-10 w-10 text-primary" />,
  Shield: <Shield className="h-10 w-10 text-primary" />,
  Leaf: <Leaf className="h-10 w-10 text-primary" />,
  Rocket: <Rocket className="h-10 w-10 text-primary" />
};

interface ValueCardProps {
  value: CoreValue;
}

const ValueCard = memo(({ value }: ValueCardProps) => (
  <div className="p-8 rounded-lg border border-border/30 bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group relative">
    {value.trending && (
      <div className="absolute -top-3 -right-3 flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
        <TrendingUp className="h-3 w-3" />
        <span>2025</span>
      </div>
    )}
    <div className="mb-5 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform">
      {iconMap[value.icon]}
    </div>
    <h3 className="text-xl font-semibold mb-3 font-heading text-foreground">{value.title}</h3>
    <p className="text-muted-foreground mb-4">{value.description}</p>
    {value.stat && (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-primary font-bold">{value.stat.value}</span>
        <span className="text-muted-foreground">{value.stat.label}</span>
      </div>
    )}
  </div>
));
ValueCard.displayName = "ValueCard";

const CoreValuesSection = memo(() => {
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Updated December 2025</span>
          </div>
          <h2 className="text-3xl font-bold font-heading text-foreground">Our Core Values</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Guiding principles that drive our innovation and excellence in every project
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
});
CoreValuesSection.displayName = "CoreValuesSection";

export default CoreValuesSection;
