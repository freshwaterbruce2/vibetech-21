import React, { memo } from "react";
import { Youtube, Gamepad, User, Video, TrendingUp, Play } from "lucide-react";
import { mediaTags, mediaStats } from "./aboutData";

const iconMap: Record<string, React.ReactNode> = {
  Youtube: <Youtube size={16} className="text-primary" />,
  Gamepad: <Gamepad size={16} className="text-primary" />,
  User: <User size={16} className="text-primary" />,
  Video: <Video size={16} className="text-primary" />
};

interface MediaTagBadgeProps {
  icon: string;
  label: string;
  stat?: string;
}

const MediaTagBadge = memo(({ icon, label, stat }: MediaTagBadgeProps) => (
  <div className="px-4 py-2 bg-card border border-border/30 rounded-full flex items-center gap-2 hover:border-primary/50 transition-colors">
    {iconMap[icon]}
    <span className="text-foreground">{label}</span>
    {stat && <span className="text-primary text-sm font-medium">({stat})</span>}
  </div>
));
MediaTagBadge.displayName = "MediaTagBadge";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem = memo(({ value, label }: StatItemProps) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-primary">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
));
StatItem.displayName = "StatItem";

const GamingSocialSection = memo(() => {
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent rounded-lg blur-xl"></div>
            <div className="relative tech-border rounded-lg overflow-hidden">
              <div className="aspect-video bg-card/40 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1800&auto=format" 
                  alt="Gaming and social media content" 
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Media Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-card/50 backdrop-blur-sm border border-border/30 rounded-lg">
              <StatItem value={mediaStats.subscribers} label="Subscribers" />
              <StatItem value={mediaStats.watchTime} label="Watch Time" />
              <StatItem value={mediaStats.engagement} label="Engagement" />
              <StatItem value={mediaStats.platforms} label="Platforms" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>Growing in 2025</span>
            </div>
            <h2 className="text-3xl font-bold mb-6 font-heading text-foreground">
              Gaming & <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Media</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-accent mb-6 rounded-full"></div>
            <p className="text-lg mb-4 text-foreground">
              Led by Blake Freshwater, our gaming and social media division creates engaging content across multiple platforms to connect with audiences worldwide.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              From YouTube tutorials and gameplay videos to managing our social media presence, Blake brings creativity and expertise to expand our digital footprint in 2025 with AI-enhanced content creation.
            </p>
            <div className="flex flex-wrap gap-3">
              {mediaTags.map((tag, index) => (
                <MediaTagBadge key={index} icon={tag.icon} label={tag.label} stat={tag.stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
GamingSocialSection.displayName = "GamingSocialSection";

export default GamingSocialSection;
