import React, { memo } from "react";
import PageHeader from "@/components/ui/page-header";
import { heroStats } from "./aboutData";
import { TrendingUp, CheckCircle, Globe, Calendar } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Projects Delivered": <CheckCircle className="h-4 w-4 text-primary" />,
  "Client Satisfaction": <TrendingUp className="h-4 w-4 text-primary" />,
  "Countries Served": <Globe className="h-4 w-4 text-primary" />,
  "Years Experience": <Calendar className="h-4 w-4 text-primary" />
};

interface StatBadgeProps {
  value: string;
  label: string;
}

const StatBadge = memo(({ value, label }: StatBadgeProps) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/30 rounded-full">
    {iconMap[label]}
    <span className="text-primary font-bold">{value}</span>
    <span className="text-muted-foreground text-sm">{label}</span>
  </div>
));
StatBadge.displayName = "StatBadge";

const AboutHeroSection = memo(() => {
  return (
    <section className="pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader 
          title="About Vibe Tech" 
          subtitle="Creating AI-powered digital solutions that combine stunning design with next-generation functionality since 2020." 
        />
        
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-14">
          {heroStats.map((stat, index) => (
            <StatBadge key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-lg mb-6 text-foreground">
              Vibe Tech is a cutting-edge digital agency founded by Bruce Freshwater, focused on creating innovative AI-powered solutions that combine stunning design with powerful functionality.
            </p>
            <p className="text-lg mb-6 text-foreground">
              Founded in 2020, our family-run team brings together decades of combined experience in full-stack development, AI integration, UI/UX design, and digital strategy to deliver exceptional results for clients across 12 countries.
            </p>
            <p className="text-lg text-foreground">
              Our mission in 2025 is to help businesses harness the power of AI agents, edge computing, and modern web technologies to achieve their goals—with a focus on creating intuitive, accessible, and visually striking digital experiences.
            </p>
            
            {/* 2025 Highlights */}
            <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-3">December 2025 Highlights</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>40+ AI-powered projects deployed this year</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>99.97% uptime across all client applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Expanded to 12 countries served globally</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-lg blur-xl"></div>
            <div className="relative tech-border rounded-lg overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Team working on tech projects" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
AboutHeroSection.displayName = "AboutHeroSection";

export default AboutHeroSection;
