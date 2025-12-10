export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  stats?: ProjectStats;
  trending?: boolean;
  completedDate?: string;
};

export type ProjectStats = {
  performance?: number;
  users?: string;
  uptime?: string;
};

export type PortfolioStats = {
  projectsCompleted: number;
  clientSatisfaction: string;
  avgLoadTime: string;
  repeatClients: string;
};

export type ServiceItem = {
  title: string;
  icon: React.ReactNode;
  description: string;
  stat?: string;
  trend?: string;
};
