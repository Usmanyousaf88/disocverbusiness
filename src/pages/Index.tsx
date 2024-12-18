import React, { useState } from "react";
import InterestSelector from "@/components/InterestSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ApiKeyInput from "@/components/ApiKeyInput";
import ResultsSection from "@/components/ResultsSection";

const Index = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [useCases, setUseCases] = useState<Array<{
    title: string;
    description: string;
    steps: string[];
    audience: string;
    prompt: string;
    aiResponse?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
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
    const triplets: string[][] = [];
    const quadruplets: string[][] = [];
    
    // Generate triplets
    for (let i = 0; i < interests.length - 2; i++) {
      for (let j = i + 1; j < interests.length - 1; j++) {
        for (let k = j + 1; k < interests.length; k++) {
          triplets.push([interests[i], interests[j], interests[k]]);
        }
      }
    }
    
    // Generate quadruplets
    for (let i = 0; i < interests.length - 3; i++) {
      for (let j = i + 1; j < interests.length - 2; j++) {
        for (let k = j + 1; k < interests.length - 1; k++) {
          for (let l = k + 1; l < interests.length; l++) {
            quadruplets.push([interests[i], interests[j], interests[k], interests[l]]);
          }
        }
      }
    }

    // Randomly select combinations to get a total of 5
    // We'll aim for roughly 60% triplets and 40% quadruplets
    const shuffledTriplets = triplets.sort(() => Math.random() - 0.5);
    const shuffledQuadruplets = quadruplets.sort(() => Math.random() - 0.5);

    const numberOfTriplets = Math.min(3, shuffledTriplets.length);
    const numberOfQuadruplets = Math.min(2, shuffledQuadruplets.length);

    combinations.push(...shuffledTriplets.slice(0, numberOfTriplets));
    combinations.push(...shuffledQuadruplets.slice(0, numberOfQuadruplets));

    // Shuffle the final combinations
    return combinations.sort(() => Math.random() - 0.5).slice(0, 5);
  };

  const getInterestName = (id: string): string => {
    const interest = InterestSelector.predefinedInterests?.find((i) => i.id === id);
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

  const fetchAIResponse = async (prompt: string) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a business consultant helping entrepreneurs identify unique business opportunities by combining different interests and hobbies. Be specific and actionable in your suggestions."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      throw error;
    }
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to generate combinations",
        variant: "destructive",
      });
      return;
    }

    if (selectedInterests.length < 2) {
      toast({
        title: "Please select at least 2 interests",
        description: "More interests create more interesting combinations!",
        variant: "destructive",
      });
      return;
    }

    if (selectedInterests.length > 8) {
      toast({
        title: "Too many interests selected",
        description: "Please select 8 or fewer interests for better results",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const combinations = generateCombinations(selectedInterests);
      const useCasesPromises = combinations.map(async (combo) => {
        const prompt = generatePrompt(combo);
        const aiResponse = await fetchAIResponse(prompt);
        return {
          title: combo.map(getInterestName).join(" + "),
          description: "AI-generated business opportunity",
          steps: [
            "Analyze market opportunities",
            "Identify target audience",
            "Create initial product/service offering",
            "Test and validate your idea",
          ],
          audience: "People interested in " + combo.map(getInterestName).join(" and "),
          prompt: prompt,
          aiResponse: aiResponse,
        };
      });

      const resolvedUseCases = await Promise.all(useCasesPromises);
      setUseCases(resolvedUseCases);
      setShowResults(true);
      
      toast({
        title: "Success!",
        description: "Generated 5 unique business opportunities",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI responses. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Passion-Driven Income
          </h1>
          <p className="text-lg text-gray-600">
            Select 2-8 interests to explore unique business opportunities
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6 mb-8">
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />

          <h2 className="text-2xl font-semibold mb-6">Select Your Interests</h2>
          <InterestSelector
            selectedInterests={selectedInterests}
            onInterestSelect={handleInterestSelect}
          />
          <div className="mt-8 text-center">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || selectedInterests.length < 2 || selectedInterests.length > 8}
              className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white px-8 py-2 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLoading ? "Generating..." : "Generate Combinations"}
            </Button>
          </div>
        </div>

        <ResultsSection showResults={showResults} useCases={useCases} />
      </div>
    </div>
  );
};

export default Index;
