import React from "react";
import BusinessIdeaCard from "./BusinessIdeaCard";

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  audience: string;
  prompt: string;
  aiResponse?: string;
  price?: {
    input: number;
    output: number;
    total: number;
  };
  words?: {
    input: number;
    output: number;
    total: number;
  };
}

interface ResultsSectionProps {
  showResults: boolean;
  useCases: UseCase[];
  straicoKey: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ showResults, useCases, straicoKey }) => {
  if (!showResults) return null;

  const splitIdeasFromResponse = (response: string): string[] => {
    const ideas = response.split(/---+/).map(idea => idea.trim()).filter(Boolean);
    return ideas;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <h2 className="text-2xl font-bold text-primary mb-4">Your AI-Generated Business Ideas</h2>
      {useCases.map((useCase) => {
        if (!useCase.aiResponse) return null;
        
        const ideas = splitIdeasFromResponse(useCase.aiResponse);
        
        return (
          <div key={useCase.title} className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-500">Target Audience:</span>
                <p className="text-gray-700">{useCase.audience}</p>
              </div>
              {useCase.price && (
                <div className="mt-4 text-sm">
                  <p className="text-gray-600">Processing Cost: ${useCase.price.total.toFixed(2)}</p>
                  <p className="text-gray-600">Words Processed: {useCase.words?.total}</p>
                </div>
              )}
            </div>
            
            {ideas.map((idea, ideaIndex) => (
              <BusinessIdeaCard
                key={`idea-${ideaIndex}`}
                idea={idea}
                index={ideaIndex}
                straicoKey={straicoKey}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ResultsSection;