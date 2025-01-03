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
  const sections = filterContent(content, activeSection);
  
  return (
    <div className="mt-8">
      {Object.entries(sections).map(([section, content]) => {
        const sectionTitle = section
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .trim();
        
        return (
          <SectionCard
            key={section}
            title={sectionTitle}
            introText={getIntroText(section)}
          >
            <SectionContent content={content} />
          </SectionCard>
        );
      })}
    </div>
  );
};

export default ResultContent;