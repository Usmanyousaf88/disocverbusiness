import React from 'react';
import { Card } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  introText: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, introText, children }) => {
  return (
    <Card className="mb-6 p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn">
      <h4 className="text-2xl font-semibold text-primary mb-2">{title}</h4>
      <p className="text-lg text-gray-600 italic mb-6">{introText}</p>
      <div className="space-y-2 prose prose-lg">
        {children}
      </div>
    </Card>
  );
};

export default SectionCard;