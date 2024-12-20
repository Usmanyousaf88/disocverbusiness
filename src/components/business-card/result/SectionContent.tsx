import React from 'react';
import ContentLine from './ContentLine';

interface SectionContentProps {
  content: string[];
}

const SectionContent: React.FC<SectionContentProps> = ({ content }) => {
  const formattedContent = content
    .join('\n')
    .replace(/^(\d\.|\•)\s/gm, '')
    .split('\n')
    .filter(line => line.trim());

  return (
    <>
      {formattedContent.map((line, i) => {
        // Check if the line matches the title pattern (all caps words)
        const isTitle = i === 0 || Boolean(line.match(/^[A-Z][A-Za-z\s]+$/));
        
        return (
          <ContentLine
            key={i}
            line={line}
            isTitle={isTitle}
          />
        );
      })}
    </>
  );
};

export default SectionContent;