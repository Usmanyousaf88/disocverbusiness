import React from 'react';
import { type ResultSection } from './FilterButtons';
import SectionCard from './result/SectionCard';
import SectionContent from './result/SectionContent';
import { filterContent } from './result/filterContent';
import { getIntroText } from './result/getIntroText';

interface ResultContentProps {
  content: string;
  activeSection: ResultSection;
}

const ResultContent: React.FC<ResultContentProps> = ({ content, activeSection }) => {
  const renderSections = (sections: { [key: string]: string }) => {
    return Object.entries(sections).map(([section, content]) => {
      const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1)
        .replace(/([A-Z])/g, ' $1')
        .trim();
      
      const introText = getIntroText(section);

      return (
        <SectionCard
          key={section}
          title={sectionTitle}
          introText={introText}
        >
          <SectionContent content={content} />
        </SectionCard>
      );
    });
  };

  if (!content) return null;

  const filteredContent = filterContent(content, activeSection);
  
  return (
    <div className="mt-8">
      {renderSections(filteredContent)}
    </div>
  );
};

export default ResultContent;