import React, { memo } from 'react';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Award, TrendingUp } from "lucide-react";
import { familyMembers } from "./aboutData";
import type { FamilyMember } from "./types";

interface MemberCardProps {
  member: FamilyMember;
  onClick: (name: string, relation: string) => void;
}

const MemberCard = memo(({ member, onClick }: MemberCardProps) => (
  <div 
    className="glass-card p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group" 
    onClick={() => onClick(member.name, member.relation)}
  >
    <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
      <AvatarImage src={member.imageUrl} alt={member.name} />
      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
    </Avatar>
    <h3 className="text-xl font-semibold text-center text-foreground">{member.name}</h3>
    <p className="text-center text-primary font-medium">{member.relation}</p>
    
    {member.expertise && (
      <div className="flex flex-wrap justify-center gap-1 mt-3">
        {member.expertise.slice(0, 2).map((skill, idx) => (
          <span key={idx} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
            {skill}
          </span>
        ))}
      </div>
    )}
    
    {member.stat && (
      <div className="flex items-center justify-center gap-2 mt-4 text-sm">
        <Award className="h-4 w-4 text-primary" />
        <span className="text-primary font-bold">{member.stat.value}</span>
        <span className="text-muted-foreground">{member.stat.label}</span>
      </div>
    )}
  </div>
));
MemberCard.displayName = "MemberCard";

const TeamSection = memo(() => {
  const handleFamilyMemberClick = (name: string, relation: string) => {
    toast({
      title: `${name}`,
      description: `${relation}`,
      variant: "success"
    });
  };

  return (
    <section className="content-section py-16">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold text-foreground font-heading">Meet Our Family</h2>
      </div>
      <p className="text-center text-muted-foreground mb-4 max-w-xl mx-auto">
        At Vibe Tech, we're more than just a company - we're a family dedicated to creating incredible digital experiences together.
      </p>
      
      {/* Team Stats */}
      <div className="flex justify-center gap-6 mb-10">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-primary font-bold">150+</span>
          <span className="text-muted-foreground">projects completed</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Award className="h-4 w-4 text-primary" />
          <span className="text-primary font-bold">98.5%</span>
          <span className="text-muted-foreground">satisfaction rate</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {familyMembers.map((member, index) => (
          <MemberCard 
            key={index} 
            member={member} 
            onClick={handleFamilyMemberClick}
          />
        ))}
      </div>
    </section>
  );
});
TeamSection.displayName = "TeamSection";

export default TeamSection;
