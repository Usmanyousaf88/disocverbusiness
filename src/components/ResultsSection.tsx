import React from "react";
import UseCaseCard from "@/components/UseCaseCard";

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
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ showResults, useCases }) => {
  if (!showResults) return null;

  return (
    <div className="space-y-8">
      {useCases.map((useCase, index) => (
        <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6">
          <UseCaseCard {...useCase} />
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-md">
              <h4 className="font-semibold mb-2">AI Response:</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {useCase.aiResponse}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsSection;