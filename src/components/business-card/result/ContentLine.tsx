import React from 'react';
import { Check } from 'lucide-react';

interface ContentLineProps {
  line: string;
  isTitle?: boolean;
}

const ContentLine: React.FC<ContentLineProps> = ({ line, isTitle }) => {
  if (isTitle) {
    return (
      <h5 className="text-lg font-semibold text-primary mt-4 mb-2">
        {line}
      </h5>
    );
  }

  return (
    <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
      <p className="text-gray-700 leading-relaxed">{line}</p>
    </div>
  );
};

export default ContentLine;