import React from 'react';

interface SectionSummaryProps {
  summary: string;
}

const SectionSummary: React.FC<SectionSummaryProps> = ({ summary }) => {
  if (!summary) return null;
  
  return (
    <div className="mt-2 text-sm text-gray-600 italic border-l-2 border-primary/30 pl-3">
      {summary}
    </div>
  );
};

export default SectionSummary;