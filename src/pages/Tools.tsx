
import { memo, useMemo } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { toolsData } from "@/components/tools/toolsData"; 
import ToolsHeroSection from "@/components/tools/ToolsHeroSection";
import IntegrationShowcase from "@/components/tools/IntegrationShowcase";
import RemoteServicesBanner from "@/components/tools/RemoteServicesBanner";
import ToolsCta from "@/components/tools/ToolsCta";
import {
  ShoppingCart,
  Link2,
  Mail,
  ChartBar,
  Users,
  Paintbrush
} from "lucide-react";
import { ToolCardProps } from "@/components/tools/ToolCard";

const iconMap: Record<string, React.ElementType> = {
  linkIcon: Link2,
  shoppingCart: ShoppingCart,
  mail: Mail,
  chartBar: ChartBar,
  users: Users,
  paintbrush: Paintbrush
};

const Tools = memo(() => {
  const enrichedToolsData = useMemo<ToolCardProps[]>(() => 
    toolsData.map(tool => {
      const IconComponent = iconMap[tool.icon] || Link2;
      return {
        ...tool,
        icon: <IconComponent className="h-6 w-6 text-aura-accent" />
      };
    }), 
  []);

  return (
    <PageLayout title="Tools & Integrations">
      <ToolsHeroSection toolsData={enrichedToolsData} />
      <IntegrationShowcase />
      <RemoteServicesBanner />
      <ToolsCta />
    </PageLayout>
  );
});

Tools.displayName = "Tools";

export default Tools;
