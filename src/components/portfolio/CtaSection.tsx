import { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = memo(() => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 font-heading bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
          Have a Project in Mind?
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto text-muted-foreground">
          Whether you need an AI-powered platform, edge-native application, or custom software solution, 
          we're here to help turn your vision into reality with 2025's most advanced technologies.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
          <Link to="/contact">
            Start a Project <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </section>
  );
});
CtaSection.displayName = "CtaSection";

export default CtaSection;