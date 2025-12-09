
import { memo } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What AI features are included in each plan?",
    answer: "All plans include AI-optimized design and smart contact forms. Professional and Enterprise tiers add AI Content Assistant for generating marketing copy and blog posts, plus a Custom AI Chatbot for 24/7 customer support. Enterprise includes advanced predictive analytics powered by AI."
  },
  {
    question: "How do your 2025 prices compare to agencies?",
    answer: "In 2025, the average agency charges $150-250/hour for AI-integrated web development. Our subscription model provides the same AI capabilities at a fixed monthly rate — typically 65-70% less than agency retainers. Plus, you get ongoing support and updates included."
  },
  {
    question: "Why choose Vibe Tech over DIY AI platforms?",
    answer: "DIY platforms like Wix ADI or Squarespace AI ($29-79/month) offer generic AI templates. We provide custom AI agents trained on your brand, dedicated development expertise, and hands-on support. Our AI features are enterprise-grade, not cookie-cutter."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can switch plans at any time. Upgrades take effect immediately with prorated billing. Downgrades apply at the start of your next billing cycle. Your data and AI training are preserved across plan changes."
  },
  {
    question: "Is there a setup fee or long-term contract?",
    answer: "No setup fees, no long-term contracts. Cancel anytime without penalty. We believe in earning your business every month through results, not locking you into commitments."
  },
  {
    question: "What kind of ROI can I expect?",
    answer: "Our customers see an average ROI of 5.8x on the Professional plan within 6 months. This comes from improved lead conversion (AI chatbots), faster content production (AI assistant), and better Core Web Vitals scores driving organic traffic."
  }
];

const PricingFAQ = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-aura-accent to-aura-accentSecondary bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="bg-aura-backgroundLight rounded-lg mb-4 px-6 border border-aura-accent/10 overflow-hidden"
          >
            <AccordionTrigger className="py-5 text-left text-lg font-medium hover:no-underline text-white">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-white pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-12 text-center">
        <p className="text-white">
          Still have questions? <a href="/contact" className="text-aura-accent hover:underline">Contact our team</a> for more information.
        </p>
      </div>
    </motion.div>
  );
});

PricingFAQ.displayName = 'PricingFAQ';

export default PricingFAQ;