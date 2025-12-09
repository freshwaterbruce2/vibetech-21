import type { CoreValue, FamilyMember, CompanyStats, MediaTag } from "./types";

export const companyStats: CompanyStats = {
  founded: "2020",
  projectsDelivered: "150+",
  clientSatisfaction: "98.5%",
  teamMembers: "4",
  countriesServed: "12",
  uptime: "99.97%"
};

export const heroStats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98.5%", label: "Client Satisfaction" },
  { value: "12", label: "Countries Served" },
  { value: "5+", label: "Years Experience" }
];

export const coreValues: CoreValue[] = [
  {
    title: "AI-First Innovation",
    description: "We leverage cutting-edge AI agents, machine learning, and generative AI to build intelligent solutions that automate workflows and enhance decision-making in 2025 and beyond.",
    icon: "Sparkles",
    stat: { value: "40+", label: "AI integrations" },
    trending: true
  },
  {
    title: "User-Centric Design",
    description: "Every solution prioritizes intuitive interfaces, accessibility (WCAG 2.2), and seamless cross-platform experiences using the latest design systems.",
    icon: "User",
    stat: { value: "4.9/5", label: "UX rating" },
    trending: false
  },
  {
    title: "Edge-Native Performance",
    description: "We deploy applications on global edge networks for sub-50ms latency, ensuring lightning-fast experiences regardless of user location.",
    icon: "Zap",
    stat: { value: "<50ms", label: "avg latency" },
    trending: true
  },
  {
    title: "Zero-Trust Security",
    description: "Every project implements zero-trust architecture, end-to-end encryption, and continuous security monitoring to protect your data.",
    icon: "Shield",
    stat: { value: "100%", label: "secure deploys" },
    trending: true
  },
  {
    title: "Sustainable Tech",
    description: "We prioritize carbon-efficient hosting, optimized code, and green infrastructure partners to minimize environmental impact.",
    icon: "Leaf",
    stat: { value: "60%", label: "carbon reduced" },
    trending: false
  },
  {
    title: "Agile Excellence",
    description: "Our iterative development process with weekly sprints and continuous deployment ensures rapid delivery without compromising quality.",
    icon: "Rocket",
    stat: { value: "2 weeks", label: "avg sprint" },
    trending: false
  }
];

export const familyMembers: FamilyMember[] = [
  {
    name: "Bruce Freshwater",
    relation: "Father & Founder",
    imageUrl: "/lovable-uploads/bruce-freshwater.png",
    expertise: ["Full-Stack Development", "AI Integration", "Cloud Architecture"],
    stat: { value: "20+", label: "years experience" }
  },
  {
    name: "Vanessa Freshwater",
    relation: "Mother & Operations Director",
    imageUrl: "/lovable-uploads/3031072f-c824-4168-bf06-ea8058ad2828.png",
    expertise: ["Project Management", "Client Relations", "Quality Assurance"],
    stat: { value: "150+", label: "projects managed" }
  },
  {
    name: "Blake Freshwater",
    relation: "Son & Media Director",
    imageUrl: "/lovable-uploads/6f955020-190e-4a24-85ba-218f5e9a7701.png",
    expertise: ["Content Creation", "Social Media", "Video Production"],
    stat: { value: "50K+", label: "audience reach" }
  },
  {
    name: "Apollo Freshwater",
    relation: "Family Dog & Morale Officer",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format",
    expertise: ["Team Motivation", "Stress Relief", "Office Security"],
    stat: { value: "∞", label: "treats consumed" }
  }
];

export const mediaTags: MediaTag[] = [
  { icon: "Youtube", label: "YouTube Content", stat: "25K+ views" },
  { icon: "Gamepad", label: "Gaming", stat: "500+ hours streamed" },
  { icon: "User", label: "Social Media", stat: "15K+ followers" },
  { icon: "Video", label: "Video Production", stat: "100+ videos" }
];

export const mediaStats = {
  subscribers: "10K+",
  watchTime: "50K+ hours",
  engagement: "8.5%",
  platforms: "5"
};
