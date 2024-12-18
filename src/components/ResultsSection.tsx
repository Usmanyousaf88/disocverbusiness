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
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ showResults, useCases, apiKey }) => {
  if (!showResults) return null;

  const splitIdeasFromResponse = (response: string): string[] => {
    const ideas = response.split(/---+/).map(idea => idea.trim()).filter(Boolean);
    return ideas;
  };

  return (
    <div className="space-y-8">
      {useCases.map((useCase, useCaseIndex) => {
        if (!useCase.aiResponse) return null;
        
        const ideas = splitIdeasFromResponse(useCase.aiResponse);
        
        return (
          <div key={useCaseIndex} className="space-y-8">
            {ideas.map((idea, ideaIndex) => (
              <BusinessIdeaCard
                key={`${useCaseIndex}-${ideaIndex}`}
                idea={idea}
                index={ideaIndex}
                apiKey={apiKey}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ResultsSection;