import React from 'react';
import { type ResultSection } from './FilterButtons';
import SectionCard from './result/SectionCard';
import SectionContent from './result/SectionContent';
import { filterContent } from './result/filterContent';
import { getIntroText } from './result/getIntroText';

interface ResultContentProps {
  content: string | null;
  activeSection: ResultSection;
}

const ResultContent: React.FC<ResultContentProps> = ({ content, activeSection }) => {
  const formatDeepDiveResponse = (response: string): JSX.Element[] => {
    const sections = response
      .split(/(?=Product Development:|Market Validation:|Monetization Strategy:|Technical Infrastructure:|Go-to-Market Strategy:|Business Operations:|Legal and Compliance:|Financial Planning:|Growth Strategy:|Success Metrics:)/g)
      .filter(section => section.trim());

    return sections.map((section, index) => {
      const [title, ...content] = section.split('\n');
      const sectionTitle = title.replace(':', '');
      const introText = getIntroText(sectionTitle);

      return (
        <SectionCard 
          key={index}
          title={sectionTitle}
          introText={introText}
        >
          <SectionContent content={content} />
        </SectionCard>
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