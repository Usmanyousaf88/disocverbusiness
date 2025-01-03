import React from "react";
import BusinessIdeaCard from "./BusinessIdeaCard";

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  audience: string;
  prompt: string;
  aiResponse?: string;
}

interface ResultsSectionProps {
  showResults: boolean;
  useCases: UseCase[];
  apiKey: string;
  straicoKey: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ showResults, useCases, apiKey, straicoKey }) => {
  if (!showResults) return null;

  const splitIdeasFromResponse = (response: string): string[] => {
    const ideas = response.split(/---+/).map(idea => idea.trim()).filter(Boolean);
    return ideas;
  };

  return (
    <div className="space-y-8">
      {useCases.map((useCase) => {
        if (!useCase.aiResponse) return null;
        
        const ideas = splitIdeasFromResponse(useCase.aiResponse);
        
        return ideas.map((idea, ideaIndex) => (
          <BusinessIdeaCard
            key={`idea-${ideaIndex}`}
            idea={idea}
            index={ideaIndex}
            apiKey={apiKey}
            straicoKey={straicoKey}
          />
        ));
      })}
    </div>
  );
};

export default ResultsSection;