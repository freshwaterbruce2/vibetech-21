
import { PricingTier, MarketComparisonType, PricingStats } from './types';

// December 2025 pricing data
export const pricingStats: PricingStats = {
  totalCustomers: 2847,
  avgSavings: "67%",
  satisfactionRate: 98,
  lastUpdated: "December 2025"
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: {
      monthly: "$49",
      yearly: "$39",
    },
    description: "Perfect for startups and small businesses launching their digital presence with AI-powered tools.",
    features: [
      { text: "AI-Optimized Responsive Design", included: true, isNew: true },
      { text: "Up to 5 Pages", included: true },
      { text: "Smart Contact Forms with Lead Scoring", included: true, isNew: true },
      { text: "Core Web Vitals Optimization", included: true, tooltip: "LCP < 2.5s, FID < 100ms, CLS < 0.1" },
      { text: "3 Months Priority Support", included: true },
      { text: "AI Content Assistant", included: false },
      { text: "Custom AI Chatbot", included: false },
      { text: "Advanced Analytics Dashboard", included: false },
    ],
    comparisons: [
      { text: "65% cheaper than agency rates in 2025", tooltip: "Based on avg agency rates of $150-250/hour" },
      { text: "Includes AI features DIY platforms charge extra for" }
    ],
    stats: {
      activeUsers: 892,
      avgRoi: "3.2x"
    },
    cta: "Start Building",
  },
  {
    name: "Professional",
    price: {
      monthly: "$129",
      yearly: "$99",
    },
    description: "For growing businesses ready to leverage AI agents and automation to scale faster.",
    features: [
      { text: "AI-Optimized Responsive Design", included: true },
      { text: "Up to 15 Pages", included: true },
      { text: "Smart Contact Forms with Lead Scoring", included: true },
      { text: "Core Web Vitals Optimization", included: true },
      { text: "6 Months Priority Support", included: true },
      { text: "AI Content Assistant", included: true, isNew: true, tooltip: "Generate blog posts, copy, and marketing content" },
      { text: "Custom AI Chatbot", included: true, isNew: true, tooltip: "24/7 customer support with your brand voice" },
      { text: "Advanced Analytics Dashboard", included: false },
    ],
    comparisons: [
      { text: "Save $3,500+/mo vs hiring in-house", tooltip: "Based on avg junior developer salary in 2025" },
      { text: "AI features included that cost $200+/mo separately" }
    ],
    highlighted: true,
    badge: "Most Popular",
    stats: {
      activeUsers: 1456,
      avgRoi: "5.8x"
    },
    cta: "Go Professional",
  },
  {
    name: "Enterprise",
    price: {
      monthly: "$299",
      yearly: "$239",
    },
    description: "Complete AI-powered digital ecosystem for established businesses with complex needs.",
    features: [
      { text: "AI-Optimized Responsive Design", included: true },
      { text: "Unlimited Pages", included: true },
      { text: "Smart Contact Forms with Lead Scoring", included: true },
      { text: "Core Web Vitals Optimization", included: true },
      { text: "12 Months Dedicated Support", included: true },
      { text: "AI Content Assistant", included: true },
      { text: "Custom AI Chatbot", included: true },
      { text: "Advanced Analytics Dashboard", included: true, isNew: true, tooltip: "Real-time insights, predictive analytics, and custom reports" },
    ],
    comparisons: [
      { text: "70% lower than enterprise agency retainers", tooltip: "Based on typical enterprise retainers of $10K+/mo" },
      { text: "Full AI stack included at no extra cost" }
    ],
    stats: {
      activeUsers: 499,
      avgRoi: "8.4x"
    },
    cta: "Contact Sales",
  },
];

export const marketComparisons: MarketComparisonType[] = [
  {
    category: "DIY AI Platforms",
    description: "Basic AI website builders with templates",
    pricing: "$29-79/mo",
    limitations: "Limited customization, generic AI, no dedicated support"
  },
  {
    category: "Vibe Tech",
    description: "AI-powered design with dedicated experts",
    pricing: "$49-299/mo",
    limitations: "Custom AI agents, professional development, 24/7 support",
    highlighted: true
  },
  {
    category: "Freelancers",
    description: "Hourly billing with variable AI expertise",
    pricing: "$5,000-25,000",
    limitations: "Unpredictable costs, AI knowledge varies, limited support"
  },
  {
    category: "Enterprise Agencies",
    description: "Full-service with AI capabilities",
    pricing: "$10,000+ / month",
    limitations: "High cost, long contracts, slow iteration"
  }
];