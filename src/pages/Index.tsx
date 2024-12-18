import React, { useState } from "react";
import InterestSelector from "@/components/InterestSelector";
import UseCaseCard from "@/components/UseCaseCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleInterestSelect = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((interest) => interest !== id)
        : [...prev, id]
    );
  };

  const generateCombinations = (interests: string[]): string[][] => {
    const combinations: string[][] = [];
    
    // Generate pairs
    for (let i = 0; i < interests.length; i++) {
      for (let j = i + 1; j < interests.length; j++) {
        combinations.push([interests[i], interests[j]]);
      }
    }
    
    // Generate triplets
    for (let i = 0; i < interests.length; i++) {
      for (let j = i + 1; j < interests.length; j++) {
        for (let k = j + 1; k < interests.length; k++) {
          combinations.push([interests[i], interests[j], interests[k]]);
        }
      }
    }
    
    return combinations;
  };

  const getInterestName = (id: string): string => {
    const interest = predefinedInterests.find((i) => i.id === id);
    return interest ? interest.name : "";
  };

  const generatePrompt = (combination: string[]): string => {
    const interestNames = combination.map(getInterestName).join(", ");
    return `Create a business opportunity combining ${interestNames}:
1. Identify unique value propositions by combining these interests
2. Suggest specific products or services
3. Outline potential target audience
4. Recommend initial steps to validate the idea
5. Propose monetization strategies`;
  };

  const handleAnalyze = () => {
    if (selectedInterests.length < 2) {
      toast({
        title: "Please select at least 2 interests",
        description: "More interests create more interesting combinations!",
        variant: "destructive",
      });
      return;
    }

    if (selectedInterests.length > 5) {
      toast({
        title: "Too many interests selected",
        description: "Please select 5 or fewer interests for better results",
        variant: "destructive",
      });
      return;
    }

    const combinations = generateCombinations(selectedInterests);
    const useCases = combinations.map((combo) => ({
      title: combo.map(getInterestName).join(" + "),
      description: "Explore this unique combination of interests",
      steps: [
        "Analyze market opportunities",
        "Identify target audience",
        "Create initial product/service offering",
        "Test and validate your idea",
      ],
      audience: "People interested in " + combo.map(getInterestName).join(" and "),
      prompt: generatePrompt(combo),
    }));

    setUseCases(useCases);
    setShowResults(true);
  };

  const [useCases, setUseCases] = useState<Array<{
    title: string;
    description: string;
    steps: string[];
    audience: string;
    prompt: string;
  }>>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Passion-Driven Income
          </h1>
          <p className="text-lg text-gray-600">
            Select 2-5 interests to explore unique business opportunities
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
              disabled={selectedInterests.length < 2 || selectedInterests.length > 5}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-2"
            >
              Generate Combinations
            </Button>
          </div>
        </div>

        {showResults && (
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <UseCaseCard {...useCase} />
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-semibold mb-2">AI Prompt:</h4>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {useCase.prompt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;