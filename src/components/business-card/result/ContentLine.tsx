import React from 'react';

interface ContentLineProps {
  line: string;
  isTitle?: boolean;
}

const ContentLine: React.FC<ContentLineProps> = ({ line, isTitle }) => {
  const processLine = (text: string): string => {
    return text
      .replace(/<\/?b>/g, '')
      .replace(/^([A-Za-z\s]+):/, (match) => `${match.slice(0, -1)}`)
      .replace(/requirements/gi, "things we need")
      .replace(/implementation/gi, "putting it into action")
      .replace(/infrastructure/gi, "technical foundation")
      .replace(/monetization/gi, "making money")
      .replace(/strategy/gi, "plan")
      .replace(/metrics/gi, "measures of success")
      .replace(/KPIs/gi, "key success indicators");
  };

  const processedLine = processLine(line);

  if (isTitle) {
    return (
      <h5 className="text-xl font-semibold text-primary mt-6 mb-2">
        {processedLine}
      </h5>
    );
  }

  return (
    <p className="mb-4 leading-relaxed text-gray-700">
      {processedLine}
    </p>
  );
};

export default ContentLine;