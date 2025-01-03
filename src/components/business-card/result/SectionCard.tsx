import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SectionCardProps {
  title: string;
  introText: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, introText, children }) => {
  return (
    <Card className="mb-6 p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-2xl font-semibold text-primary mb-2">{title}</h4>
          <p className="text-lg text-gray-600 italic">{introText}</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {title.split(' ')[0]}
        </Badge>
      </div>
      <div className="mt-6 space-y-4 prose prose-lg">
        {children}
      </div>
    </Card>
  );
};

export default SectionCard;