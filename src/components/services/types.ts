
import { LucideIcon } from "lucide-react";

export interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: {
    type: LucideIcon;
    props: {
      className: string;
    }
  };
  features: string[];
  stats?: {
    clients?: number;
    projectsCompleted?: number;
    satisfaction?: number;
  };
  trending?: boolean;
}