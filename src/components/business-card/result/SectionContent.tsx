import React from 'react';
import ContentLine from './ContentLine';

interface SectionContentProps {
  content: string[];
}

const SectionContent: React.FC<SectionContentProps> = ({ content }) => {
  const formattedContent = content
    .join('\n')
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^(\d\.|\•)\s/, ''));

  return (
    <div className="space-y-4">
      {formattedContent.map((line, i) => {
        const isTitle = i === 0 || /^[A-Z][A-Z\s]+:/.test(line);
        return (
          <ContentLine
            key={i}
            line={line}
            isTitle={isTitle}
          />
        );
      })}
    </div>
  );
};

export default SectionContent;