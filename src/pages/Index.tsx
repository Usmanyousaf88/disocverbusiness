import React, { useState } from "react";
import InterestSelector from "@/components/InterestSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ApiKeyInput from "@/components/ApiKeyInput";
import ResultsSection from "@/components/ResultsSection";
import AnalysisButton from "@/components/AnalysisButton";
import { generateCombinations, generatePrompt } from "@/utils/combinationGenerator";

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

  const getInterestName = (id: string): string => {
    const interest = InterestSelector.predefinedInterests?.find((i) => i.id === id);
    return interest ? interest.name : "";
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

    if (selectedInterests.length < 3) {
      toast({
        title: "Please select at least 3 interests",
        description: "More interests create more interesting combinations!",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const combinations = generateCombinations(selectedInterests);
      const prompt = generatePrompt(combinations.map(combo => combo.map(getInterestName)));

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
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setUseCases([{
        title: "Combined Interests Analysis",
        description: "AI-generated business opportunities based on your interests",
        steps: ["Analyze market opportunities", "Identify target audience", "Create initial offering", "Test and validate"],
        audience: "Entrepreneurs interested in " + selectedInterests.map(getInterestName).join(", "),
        prompt: prompt,
        aiResponse: aiResponse,
      }]);
      
      setShowResults(true);
      toast({
        title: "Success!",
        description: "Generated business opportunities based on your interests",
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
            Select 3 or more interests to explore unique business opportunities
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6 mb-8">
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />

          <h2 className="text-2xl font-semibold mb-6">Select Your Interests</h2>
          <InterestSelector
            selectedInterests={selectedInterests}
            onInterestSelect={handleInterestSelect}
          />
          <AnalysisButton
            isLoading={isLoading}
            disabled={isLoading || selectedInterests.length < 3}
            onClick={handleAnalyze}
          />
        </div>

        <ResultsSection 
          showResults={showResults} 
          useCases={useCases} 
          apiKey={apiKey}
        />
      </div>
    </div>
  );
};

export default Index;