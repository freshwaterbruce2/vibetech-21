// Define the types used across dashboard data components
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  company_logo?: string | null;
  linkedin_url?: string | null;
  location?: string | null;
  service_interest?: string | null;
  created_at: string;
  updated_at: string;
  enriched_at?: string | null;
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeadsToday: number;
  conversionRate: string;
  avgResponseTime: string;
}

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal" | "Closed";
