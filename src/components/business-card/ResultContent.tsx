import React from 'react';
import { Target } from "lucide-react";
import { Card } from "@/components/ui/card";
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
      'product-development': content.split('Market Validation:')[0],
      'market-validation': content.split('Market Validation:')[1]?.split('Monetization Strategy:')[0] || '',
      'monetization': content.split('Monetization Strategy:')[1]?.split('Technical Infrastructure:')[0] || '',
      'technical': content.split('Technical Infrastructure:')[1]?.split('Go-to-Market Strategy:')[0] || '',
      'go-to-market': content.split('Go-to-Market Strategy:')[1]?.split('Business Operations:')[0] || '',
      'operations': content.split('Business Operations:')[1]?.split('Legal and Compliance:')[0] || '',
      'legal': content.split('Legal and Compliance:')[1]?.split('Financial Planning:')[0] || '',
      'financial': content.split('Financial Planning:')[1]?.split('Growth Strategy:')[0] || '',
      'growth': content.split('Growth Strategy:')[1]?.split('Success Metrics:')[0] || '',
      'metrics': content.split('Success Metrics:')[1] || ''
    };
    
    return sections[section] || '';
  };

  const formatDeepDiveResponse = (response: string): JSX.Element[] => {
    const sections = response
      .split(/(?=Business Model:|Success Stories:|Resource Directory:|Market Analysis:|Financial Projections:|Implementation Timeline:|Marketing Strategy:|Risk Assessment:|Networking Opportunities:|Learning Resources:)/g)
      .filter(section => section.trim());

    return sections.map((section, index) => {
      const [title, ...content] = section.split('\n');
      const formattedContent = content
        .join('\n')
        .replace(/^\d\.\s/gm, '• ')
        .split('\n')
        .filter(line => line.trim())
        .map((line, i) => {
          if (line.startsWith('•')) {
            return (
              <div key={i} className="flex items-start gap-3 mb-3 pl-4">
                <Target className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span>{line.replace('• ', '')}</span>
              </div>
            );
          }
          return <p key={i} className="mb-3">{line}</p>;
        });

      return (
        <Card 
          key={index} 
          className="mb-6 p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
        >
          <h4 className="text-2xl font-semibold text-primary mb-6">{title}</h4>
          <div className="space-y-2">
            {formattedContent}
          </div>
        </Card>
      );
    });
  };

  const filteredContent = filterContent(content, activeSection);
  
  return (
    <div className="mt-8">
      <div className="prose prose-lg max-w-none space-y-4">
        {formatDeepDiveResponse(filteredContent)}
      </div>
    </div>
  );
};

export default ResultContent;