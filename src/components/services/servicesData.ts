
import { Code, Lightbulb, Layout, Database, Shield, Activity, Bot, Cpu } from "lucide-react";
import { ServiceType } from "./types";

export const services: ServiceType[] = [
  {
    id: "web",
    name: "Web Development",
    description: "Next-gen web apps with AI-powered interfaces, edge computing, and blazing-fast performance.",
    icon: {
      type: Layout,
      props: {
        className: "h-6 w-6 text-[color:var(--c-cyan)]"
      }
    },
    features: [
      "AI-enhanced UI/UX with smart personalization",
      "Edge-first architecture for global speed",
      "Progressive Web Apps (PWA) with offline-first",
      "Web3 & blockchain integration ready",
      "Core Web Vitals optimization (LCP < 2.5s)"
    ],
    stats: {
      clients: 127,
      projectsCompleted: 340,
      satisfaction: 98
    }
  },
  {
    id: "app",
    name: "App Development",
    description: "Cross-platform apps with AI agents, real-time sync, and native performance.",
    icon: {
      type: Code,
      props: {
        className: "h-6 w-6 text-[color:var(--c-purple)]"
      }
    },
    features: [
      "React Native & Flutter expertise",
      "On-device AI & ML capabilities",
      "Real-time collaboration features",
      "Wearable & IoT integration",
      "App Store optimization included"
    ],
    stats: {
      clients: 89,
      projectsCompleted: 156,
      satisfaction: 97
    }
  },
  {
    id: "ai",
    name: "AI Agents & Automation",
    description: "Deploy intelligent AI agents that automate workflows and drive autonomous decision-making.",
    icon: {
      type: Bot,
      props: {
        className: "h-6 w-6 text-[color:var(--c-teal)]"
      }
    },
    features: [
      "Custom AI agents with tool calling",
      "RAG-powered knowledge systems",
      "Multi-modal AI (text, vision, voice)",
      "Autonomous workflow automation",
      "AI governance & safety frameworks"
    ],
    stats: {
      clients: 64,
      projectsCompleted: 112,
      satisfaction: 99
    },
    trending: true
  },
  {
    id: "cloud",
    name: "Edge & Cloud",
    description: "Distributed infrastructure with edge computing for ultra-low latency worldwide.",
    icon: {
      type: Cpu,
      props: {
        className: "h-6 w-6 text-[color:var(--c-cyan)]"
      }
    },
    features: [
      "Edge computing deployment",
      "Multi-cloud orchestration",
      "Serverless at scale (0ms cold starts)",
      "Real-time data streaming",
      "Cost optimization automation"
    ],
    stats: {
      clients: 78,
      projectsCompleted: 203,
      satisfaction: 96
    },
    trending: true
  },
  {
    id: "security",
    name: "Zero Trust Security",
    description: "Enterprise-grade cybersecurity with AI threat detection and zero-trust architecture.",
    icon: {
      type: Shield,
      props: {
        className: "h-6 w-6 text-[color:var(--c-purple)]"
      }
    },
    features: [
      "Zero-trust network implementation",
      "AI-powered threat detection",
      "SOC 2 & ISO 27001 compliance",
      "Penetration testing & red team",
      "Security awareness training"
    ],
    stats: {
      clients: 52,
      projectsCompleted: 98,
      satisfaction: 100
    }
  },
  {
    id: "consulting",
    name: "Digital Strategy",
    description: "Strategic guidance for AI adoption, digital transformation, and technology roadmaps.",
    icon: {
      type: Activity,
      props: {
        className: "h-6 w-6 text-[color:var(--c-teal)]"
      }
    },
    features: [
      "AI readiness assessment",
      "Digital transformation roadmap",
      "Technology due diligence",
      "Fractional CTO services",
      "Team upskilling & workshops"
    ],
    stats: {
      clients: 143,
      projectsCompleted: 287,
      satisfaction: 98
    }
  }
];

// December 2025 aggregate stats
export const serviceStats = {
  totalClients: 553,
  totalProjects: 1196,
  avgSatisfaction: 98,
  yearsExperience: 8,
  lastUpdated: "December 2025"
};