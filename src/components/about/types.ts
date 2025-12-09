export interface CoreValue {
  title: string;
  description: string;
  icon: string;
  stat?: {
    value: string;
    label: string;
  };
  trending?: boolean;
}

export interface FamilyMember {
  name: string;
  relation: string;
  imageUrl: string;
  expertise?: string[];
  stat?: {
    value: string;
    label: string;
  };
}

export interface CompanyStats {
  founded: string;
  projectsDelivered: string;
  clientSatisfaction: string;
  teamMembers: string;
  countriesServed: string;
  uptime: string;
}

export interface MediaTag {
  icon: string;
  label: string;
  stat?: string;
}
