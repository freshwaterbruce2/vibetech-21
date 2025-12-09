
export type PricingTier = {
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
  description: string;
  features: {
    text: string;
    included: boolean;
    tooltip?: string;
    isNew?: boolean;
  }[];
  comparisons?: {
    text: string;
    tooltip?: string;
  }[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
  stats?: {
    activeUsers?: number;
    avgRoi?: string;
  };
};

export type MarketComparisonType = {
  category: string;
  description: string;
  pricing: string;
  limitations: string;
  highlighted?: boolean;
};

export type PricingStats = {
  totalCustomers: number;
  avgSavings: string;
  satisfactionRate: number;
  lastUpdated: string;
};