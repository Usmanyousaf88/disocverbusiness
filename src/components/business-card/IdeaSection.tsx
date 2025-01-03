import React from 'react';
import SectionSummary from './SectionSummary';

interface IdeaSectionProps {
  title: string;
  content: string;
  summary?: string;
  className?: string;
  icon?: React.ReactNode;
}

const IdeaSection: React.FC<IdeaSectionProps> = ({ 
  title, 
  content, 
  summary,
  className = "bg-white/50",
  icon
}) => {
  return (
    <div className={`${className} rounded-lg p-4`}>
      <h4 className="font-semibold text-lg text-primary mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h4>
      <p className="text-gray-700">{content}</p>
      <SectionSummary summary={summary} />
    </div>
  );
};

export default IdeaSection;