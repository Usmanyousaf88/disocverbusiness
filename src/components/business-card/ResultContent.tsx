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
      .split(/(?=Product Development:|Market Validation:|Monetization Strategy:|Technical Infrastructure:|Go-to-Market Strategy:|Business Operations:|Legal and Compliance:|Financial Planning:|Growth Strategy:|Success Metrics:)/g)
      .filter(section => section.trim());

    return sections.map((section, index) => {
      const [title, ...content] = section.split('\n');
      const formattedContent = content
        .join('\n')
        .replace(/^\d\.\s/gm, '')
        .replace(/•\s/gm, '')
        .split('\n')
        .filter(line => line.trim())
        .map((line, i) => {
          // Convert bullet points into conversational paragraphs
          const conversationalLine = line
            .replace(/^([A-Za-z\s]+):/, (match) => `🎯 Let's talk about ${match.slice(0, -1)}: `)
            .replace(/requirements/gi, 'things we'll need')
            .replace(/implementation/gi, 'putting it into action')
            .replace(/infrastructure/gi, 'technical foundation')
            .replace(/monetization/gi, 'making money')
            .replace(/strategy/gi, 'plan')
            .replace(/metrics/gi, 'measures of success')
            .replace(/KPIs/gi, 'key success indicators');

          return (
            <p key={i} className="mb-4 leading-relaxed text-gray-700">
              {conversationalLine}
            </p>
          );
        });

      const sectionTitle = title.replace(':', '');
      const introText = {
        'Product Development': "Let's explore how we'll build your product...",
        'Market Validation': "Here's what we know about your potential customers...",
        'Monetization Strategy': "Now, let's talk about how you'll make money...",
        'Technical Infrastructure': "Here's the technology foundation you'll need...",
        'Go-to-Market Strategy': "Let's plan how to launch your product...",
        'Business Operations': "Here's how you'll run your business day-to-day...",
        'Legal and Compliance': "Important legal stuff to keep in mind...",
        'Financial Planning': "Let's talk about the money side of things...",
        'Growth Strategy': "Here's how we'll help your business grow...",
        'Success Metrics': "Here's how we'll measure your success..."
      }[sectionTitle] || "Let's dive into the details...";

      return (
        <Card 
          key={index} 
          className="mb-6 p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
        >
          <h4 className="text-2xl font-semibold text-primary mb-4">{sectionTitle}</h4>
          <p className="text-lg text-gray-600 italic mb-6">{introText}</p>
          <div className="space-y-4 prose prose-lg">
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