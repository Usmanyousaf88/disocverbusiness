import React, { useState } from "react";
import InterestSelector from "@/components/InterestSelector";
import UseCaseCard from "@/components/UseCaseCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleInterestSelect = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((interest) => interest !== id)
        : [...prev, id]
    );
  };

  const handleAnalyze = () => {
    if (selectedInterests.length > 0) {
      setShowResults(true);
    }
  };

  const getUseCases = (interestId: string) => {
    // Simplified example - in a real app, this would come from a database or API
    const useCases = {
      "1": [
        {
          title: "Freelance Content Writing",
          description:
            "Turn your writing skills into a profitable freelance business by creating content for businesses and individuals.",
          steps: [
            "Create a portfolio of writing samples",
            "Set up profiles on freelance platforms like Upwork",
            "Define your niche and target audience",
            "Start bidding on relevant projects",
          ],
          audience: "Businesses, marketers, and individuals needing content",
        },
        {
          title: "Online Course Creation",
          description:
            "Share your writing expertise through comprehensive online courses.",
          steps: [
            "Outline your course content",
            "Record video lessons",
            "Set up on platforms like Udemy or Teachable",
            "Market your course to potential students",
          ],
          audience: "Aspiring writers and content creators",
        },
      ],
      // Add more use cases for other interests
    };

    return useCases[interestId as keyof typeof useCases] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Passion-Driven Income
          </h1>
          <p className="text-lg text-gray-600">
            Select the activities you love and let us help you turn them into
            income opportunities.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Select Your Interests</h2>
          <InterestSelector
            selectedInterests={selectedInterests}
            onInterestSelect={handleInterestSelect}
          />
          <div className="mt-8 text-center">
            <Button
              onClick={handleAnalyze}
              disabled={selectedInterests.length === 0}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-2"
            >
              Analyze Opportunities
            </Button>
          </div>
        </div>

        {showResults && (
          <div className="space-y-8">
            {selectedInterests.map((interestId) => (
              <div key={interestId} className="space-y-4">
                {getUseCases(interestId).map((useCase, index) => (
                  <UseCaseCard key={index} {...useCase} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;