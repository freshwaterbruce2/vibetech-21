
export interface ToolStats {
  integrations: number;
  activeUsers: string;
  uptime: string;
}

export interface ToolCategory {
  title: string;
  description: string;
  icon: string;
  category: string;
  tools: string[];
  variant: "blue" | "purple" | "teal";
  stats: ToolStats;
  trending?: boolean;
  badge?: string;
}

export interface AggregateStats {
  totalIntegrations: number;
  activeClients: string;
  avgUptime: string;
  lastUpdated: string;
}
