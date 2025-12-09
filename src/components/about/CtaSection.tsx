import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Calendar } from "lucide-react";

const CtaSection = memo(() => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-background to-card">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Limited Slots for Q1 2026</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">Ready to Work With Us?</h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto text-muted-foreground">
          Let's turn your vision into reality with AI-powered solutions. Our team is ready to help you create exceptional digital experiences in 2025 and beyond.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
            <Link to="/contact">
              Start Your Project 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/pricing">
              <Calendar className="mr-2 h-4 w-4" />
              View Pricing
            </Link>
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
          <span>✓ Free consultation</span>
          <span>✓ 98.5% satisfaction rate</span>
          <span>✓ 150+ projects delivered</span>
          <span>✓ 24/7 support</span>
        </div>
      </div>
    </section>
  );
});
CtaSection.displayName = "CtaSection";

export default CtaSection;
