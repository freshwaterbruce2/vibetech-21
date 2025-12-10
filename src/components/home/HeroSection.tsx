import { memo } from "react";
import { Link } from "react-router-dom";
import { NeonButton } from "@/components/ui/neon-button";
import SmartLeadForm from "@/components/lead/SmartLeadForm";
import bruceProfile from "@/assets/bruce-profile.png";
import { ArrowRight, Star } from "lucide-react";

const StatBadge = memo(({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-primary">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
  </div>
));
StatBadge.displayName = 'StatBadge';

const HeroSection = memo(() => {
  return (
    <section className="pt-28 pb-20">
      <div className="glass-card mx-auto max-w-6xl px-6 py-10 lg:flex lg:items-center relative z-10 border border-primary/20 hover:border-primary/40 hover:shadow-neon-purple-soft">
        {/* Left side - Avatar with neon border */}
        <div className="w-full md:w-1/3 mb-10 md:mb-0 spotlight">
          <div className="relative w-64 h-64 mx-auto overflow-hidden rounded-full border-4 border-primary/80 shadow-[0_0_25px_rgba(var(--primary),0.6)]">
            <img 
              src={bruceProfile} 
              alt="Bruce Freshwater - Digital Experience Expert" 
              className="w-full h-full object-cover object-[center_35%]"
            />
          </div>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <StatBadge value="20+" label="Years" />
            <StatBadge value="150+" label="Projects" />
            <StatBadge value="99%" label="Uptime" />
          </div>
        </div>
        
        {/* Right side - Text with neon elements */}
        <div className="w-full md:w-2/3 md:pl-12">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-muted-foreground">Top-rated on Clutch & Upwork</span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-foreground">
            <span className="text-primary">20+ Years</span> of Digital Excellence
          </h1>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              I'm Bruce Freshwater — IT Strategist & Digital Transformation Partner
            </h2>
          </div>
          <p className="mb-8 max-w-2xl text-muted-foreground font-medium">
            With two decades of hands-on experience in IT infrastructure and digital strategy, I've helped businesses of all sizes navigate complex technology landscapes. From legacy system modernization to cutting-edge web solutions, I bring the expertise to turn your vision into reality.
          </p>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-primary">Ready to Ignite Your Vision?</h3>
            <p className="mb-4 text-muted-foreground">Tell me your goals, and together we'll craft a digital solution that dazzles and delivers.</p>
            <SmartLeadForm variant="inline" buttonText="Get Free Consultation" showServiceInterest={false} />
            
            <div className="text-center my-4">
              <span className="px-4 relative inline-flex items-center">
                <span className="neon-divider-purple absolute left-0 w-full top-1/2"></span>
                <span className="bg-background px-4 relative z-10 text-muted-foreground">or explore</span>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NeonButton variant="gradient" size="lg" asChild>
              <Link to="/portfolio">View My Work</Link>
            </NeonButton>
            <NeonButton variant="secondary" size="lg" asChild>
              <Link to="/services" className="flex items-center gap-2">
                Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </NeonButton>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
