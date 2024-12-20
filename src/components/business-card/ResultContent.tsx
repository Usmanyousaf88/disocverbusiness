import React from 'react';
import { Target } from "lucide-react";
import { type ResultSection } from './FilterButtons';

interface ResultContentProps {
  content: string | null;
  activeSection: ResultSection;
}

const ResultContent: React.FC<ResultContentProps> = ({ content, activeSection }) => {
  const filterContent = (content: string | null, section: ResultSection): string => {
    if (!content) return '';
    
    const sections: Record<ResultSection, string> = {
      'all': content,
      'business-model': content.split('Success Stories:')[0],
      'success-stories': content.split('Success Stories:')[1]?.split('Resource Directory:')[0] || '',
      'resources': content.split('Resource Directory:')[1]?.split('Market Analysis:')[0] || '',
      'market': content.split('Market Analysis:')[1]?.split('Financial Projections:')[0] || '',
      'financial': content.split('Financial Projections:')[1]?.split('Implementation Timeline:')[0] || '',
      'timeline': content.split('Implementation Timeline:')[1]?.split('Marketing Strategy:')[0] || '',
      'marketing': content.split('Marketing Strategy:')[1]?.split('Risk Assessment:')[0] || '',
      'risks': content.split('Risk Assessment:')[1]?.split('Networking Opportunities:')[0] || '',
      'networking': content.split('Networking Opportunities:')[1]?.split('Learning Resources:')[0] || '',
      'learning': content.split('Learning Resources:')[1] || ''
    };
    
    return sections[section] || '';
  };

  const formatDeepDiveResponse = (response: string): string => {
    return response
      .replace(/^\d\.\s/gm, '• ')
      .replace(/^(Business Model:|Success Stories:|Resource Directory:|Market Analysis:|Financial Projections:|Implementation Timeline:|Marketing Strategy:|Risk Assessment:|Networking Opportunities:|Learning Resources:|Business names:|First steps:|Find clients:|Offer ideas:|Practice:)/gm, 
        '<div class="text-xl font-semibold text-primary mt-8 mb-4">$1</div>')
      .replace(/^•\s(.+)$/gm, 
        '<div class="flex items-start gap-3 mb-3 pl-4"><Target class="w-4 h-4 text-primary flex-shrink-0 mt-1" /><span>$1</span></div>')
      .split('\n')
      .filter(line => line.trim())
      .join('\n');
  };

  return (
    <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-inner">
      <h4 className="text-2xl font-semibold text-primary mb-6">Your Business Roadmap:</h4>
      <div 
        className="prose prose-lg max-w-none space-y-4"
        dangerouslySetInnerHTML={{ 
          __html: formatDeepDiveResponse(filterContent(content, activeSection))
        }}
      />
    </div>
  );
};

export default ResultContent;