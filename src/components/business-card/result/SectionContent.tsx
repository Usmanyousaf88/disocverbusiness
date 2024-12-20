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
      {formattedContent.map((line, i) => (
        <ContentLine
          key={i}
          line={line}
          isTitle={i === 0 || line.match(/^[A-Z][A-Za-z\s]+$/)}
        />
      ))}
    </>
  );
};

export default SectionContent;