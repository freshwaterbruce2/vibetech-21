import { memo } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Maximize, TrendingUp, Zap, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "./types";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

const StatBadge = memo(({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div className="flex items-center gap-1 text-xs text-muted-foreground">
    {icon}
    <span className="font-medium text-foreground">{value}</span>
    <span className="hidden sm:inline">{label}</span>
  </div>
));
StatBadge.displayName = "StatBadge";

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 border border-primary/20 hover:border-primary/40 hover:shadow-lg transform transition-all duration-300 h-full group relative backdrop-blur-sm"
    >
      <Link to={`/portfolio/project-${project.id}`} className="block">
        <div className="h-60 overflow-hidden relative -mx-6 -mt-6 mb-5 rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30 z-10"></div>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 bg-accent/90 text-accent-foreground text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-sm">
            {project.category}
          </div>
          
          {project.trending && (
            <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full z-10 backdrop-blur-sm flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Trending
            </div>
          )}
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-background/60 transition-opacity duration-300 z-10">
            <Button 
              variant="ghost" 
              size="icon"
              className="bg-accent/20 text-foreground hover:bg-accent/40 rounded-full"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-2 font-heading bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
            {project.title}
          </h3>
          
          {project.stats && (
            <div className="flex flex-wrap gap-3 mb-3">
              <StatBadge icon={<Zap className="h-3 w-3 text-primary" />} value={`${project.stats.performance}%`} label="perf" />
              <StatBadge icon={<Users className="h-3 w-3 text-accent" />} value={project.stats.users || "—"} label="users" />
              <StatBadge icon={<Clock className="h-3 w-3 text-secondary" />} value={project.stats.uptime || "—"} label="uptime" />
            </div>
          )}
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-primary/10 text-xs px-2.5 py-1 rounded-full border border-primary/20 text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:bg-primary/10 p-0 group/btn"
            >
              View Project <ExternalLink className="ml-1.5 h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
            {project.completedDate && (
              <span className="text-xs text-muted-foreground">{project.completedDate}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
