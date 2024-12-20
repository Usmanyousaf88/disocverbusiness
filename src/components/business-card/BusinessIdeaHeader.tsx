import React from 'react';
import { Lightbulb, Building2 } from "lucide-react";

interface BusinessIdeaHeaderProps {
  idea: string;
}

const BusinessIdeaHeader: React.FC<BusinessIdeaHeaderProps> = ({ idea }) => {
  const formatText = (text: string): string => {
    let formattedText = text.replace(/Business Idea:/g, '');
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    const sections = formattedText.split(/(?=\n(?:Name:|Example business or person:))/g);
    
    if (sections.length > 1) {
      const mainIdea = sections[0].trim();
      
      const formattedSections = sections.slice(1)
        .map(section => {
          const [header, ...content] = section.split(':');
          if (header && content) {
            if (header.trim() === 'Name') {
              return `<div class="text-3xl font-bold mb-4 text-primary bg-primary/5 p-4 rounded-lg">${content.join(':').trim()}</div>`;
            } else if (header.trim() === 'Example business or person') {
              return `<div class="flex items-center gap-2 text-sm text-gray-600 italic mb-6">
                        <Building2 className="w-4 h-4" />
                        Similar to: ${content.join(':').trim()}
                      </div>`;
            }
          }
          return section;
        });

      return `
        <div class="flex items-start gap-3 mb-6">
          <Lightbulb class="w-6 h-6 text-primary mt-1" />
          <div class="text-lg leading-relaxed text-gray-700">${mainIdea}</div>
        </div>
        ${formattedSections.join('\n')}
      `;
    }

    return formattedText;
  };

  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ 
        __html: formatText(idea)
      }}
    />
  );
};

export default BusinessIdeaHeader;