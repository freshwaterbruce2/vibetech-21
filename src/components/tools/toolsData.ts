
import { ToolCategory, AggregateStats } from "./types";

export const aggregateStats: AggregateStats = {
  totalIntegrations: 47,
  activeClients: "2.3K+",
  avgUptime: "99.97%",
  lastUpdated: "December 2025"
};

export const toolsData: ToolCategory[] = [
  {
    title: "AI-Powered Affiliate Marketing",
    description: "Next-gen affiliate tools with AI-driven link optimization, predictive analytics, and automated campaign management for maximum ROI.",
    icon: "linkIcon",
    category: "Marketing",
    tools: ["Pretty Links Pro", "ThirstyAffiliates AI", "Impact.com", "Partnerize"],
    variant: "blue",
    stats: {
      integrations: 8,
      activeUsers: "450+",
      uptime: "99.99%"
    },
    trending: true,
    badge: "AI Enhanced"
  },
  {
    title: "Headless E-Commerce",
    description: "Modern headless commerce solutions with AI recommendations, edge-deployed storefronts, and real-time inventory sync across platforms.",
    icon: "shoppingCart",
    category: "Sales",
    tools: ["Shopify Hydrogen", "Medusa.js", "Saleor", "Commerce Layer"],
    variant: "purple",
    stats: {
      integrations: 12,
      activeUsers: "380+",
      uptime: "99.98%"
    },
    trending: true,
    badge: "Edge-Ready"
  },
  {
    title: "AI Marketing Automation",
    description: "Autonomous marketing agents that create personalized content, optimize send times with ML, and manage multi-channel campaigns intelligently.",
    icon: "mail",
    category: "Automation",
    tools: ["Klaviyo AI", "Customer.io", "Brevo (Sendinblue)", "Loops"],
    variant: "teal",
    stats: {
      integrations: 9,
      activeUsers: "520+",
      uptime: "99.95%"
    },
    trending: true,
    badge: "Agents"
  },
  {
    title: "Real-Time Analytics",
    description: "Privacy-first analytics with AI insights, predictive user behavior modeling, and edge-computed metrics for instant decision-making.",
    icon: "chartBar",
    category: "Data",
    tools: ["PostHog", "Amplitude", "Mixpanel AI", "Plausible Analytics"],
    variant: "blue",
    stats: {
      integrations: 7,
      activeUsers: "290+",
      uptime: "99.99%"
    },
    badge: "Privacy-First"
  },
  {
    title: "AI Collaboration Suite",
    description: "AI-assisted project management with smart task prioritization, automated standup reports, and predictive resource allocation.",
    icon: "users",
    category: "Teamwork",
    tools: ["Linear", "Notion AI", "Height", "Plane"],
    variant: "purple",
    stats: {
      integrations: 6,
      activeUsers: "340+",
      uptime: "99.96%"
    },
    badge: "Smart Workflows"
  },
  {
    title: "Generative Design Tools",
    description: "AI-powered design systems with auto-generated components, intelligent prototyping, and brand-consistent asset creation.",
    icon: "paintbrush",
    category: "Design",
    tools: ["Figma AI", "Framer Motion", "Webflow", "Penpot"],
    variant: "teal",
    stats: {
      integrations: 5,
      activeUsers: "410+",
      uptime: "99.97%"
    },
    trending: true,
    badge: "Gen AI"
  }
];
