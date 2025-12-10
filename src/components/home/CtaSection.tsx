import { memo } from "react";
import { Link } from "react-router-dom";
import { NeonButton } from "@/components/ui/neon-button";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

const CtaSection = memo(() => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main CTA Card */}
        <div className="glass-card p-12 border border-primary/20 hover:border-primary/40 hover:shadow-neon-purple-soft text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading bg-gradient-to-r from-primary via-accent to-cyan-400 text-transparent bg-clip-text">
            Let's Build Something Amazing
          </h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
            Whether you're launching a new product or refreshing your brand, I'm here to make it fast, fluent, and unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NeonButton variant="gradient" size="lg" asChild>
              <Link to="/contact" className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book Free Consultation
              </Link>
            </NeonButton>
            <NeonButton variant="secondary" size="lg" asChild>
              <Link to="/pricing" className="flex items-center gap-2">
                View Pricing
                <ArrowRight className="h-5 w-5" />
              </Link>
            </NeonButton>
          </div>
        </div>
        
        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/services" 
            className="glass-card p-4 text-center hover:border-primary/40 transition-all group"
          >
            <Sparkles className="h-6 w-6 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-foreground">Services</span>
          </Link>
          <Link 
            to="/portfolio" 
            className="glass-card p-4 text-center hover:border-primary/40 transition-all group"
          >
            <span className="block text-2xl mb-1">🚀</span>
            <span className="text-sm font-medium text-foreground">Portfolio</span>
          </Link>
          <Link 
            to="/tools" 
            className="glass-card p-4 text-center hover:border-primary/40 transition-all group"
          >
            <span className="block text-2xl mb-1">🛠️</span>
            <span className="text-sm font-medium text-foreground">Tools</span>
          </Link>
          <Link 
            to="/blog" 
            className="glass-card p-4 text-center hover:border-primary/40 transition-all group"
          >
            <span className="block text-2xl mb-1">📝</span>
            <span className="text-sm font-medium text-foreground">Blog</span>
          </Link>
        </div>
      </div>
    </section>
  );
});

CtaSection.displayName = 'CtaSection';

export default CtaSection;
