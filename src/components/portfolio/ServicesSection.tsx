import { memo } from "react";
import { Code, Globe, Tag, Bot, Shield, Cpu } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { ServiceItem } from "./types";

const services: ServiceItem[] = [
  {
    title: "AI-First Development",
    icon: <Bot className="h-10 w-10 text-primary" />,
    description: "We build intelligent applications powered by AI agents, generative models, and machine learning for smarter user experiences.",
    stat: "12 AI Projects",
    trend: "+340% in 2025",
  },
  {
    title: "Edge-Native Web Apps",
    icon: <Cpu className="h-10 w-10 text-accent" />,
    description: "Ultra-fast, globally distributed web applications using edge computing for sub-100ms response times worldwide.",
    stat: "0.8s Avg Load",
    trend: "99.9% Uptime",
  },
  {
    title: "Zero-Trust Security",
    icon: <Shield className="h-10 w-10 text-secondary" />,
    description: "Enterprise-grade security architecture with zero-trust principles, end-to-end encryption, and compliance-ready infrastructure.",
    stat: "100% Secure",
    trend: "SOC2 Ready",
  },
];

const ServicesSection = memo(() => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background opacity-50"></div>
      <div className="particles-bg-dense absolute inset-0 z-[1] opacity-60 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-center font-heading bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
          2025 Services
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Cutting-edge solutions built with the latest technologies and industry best practices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              stat={service.stat}
              trend={service.trend}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
ServicesSection.displayName = "ServicesSection";

export default ServicesSection;
