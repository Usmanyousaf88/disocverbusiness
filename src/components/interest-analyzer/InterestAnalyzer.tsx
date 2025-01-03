import React, { useState } from 'react';
import { Toast } from '@/components/ui/use-toast';
import InterestSelector from "@/components/InterestSelector";
import AnalysisButton from "@/components/AnalysisButton";
import { generateCombinations, generatePrompt } from "@/utils/combinationGenerator";

interface InterestAnalyzerProps {
  straicoKey: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setShowResults: (show: boolean) => void;
  setIsInterestSelectorCollapsed: (collapsed: boolean) => void;
  setUseCases: (useCases: any[]) => void;
  isInterestSelectorCollapsed: boolean;
  toast: {
    (...props: any[]): void;
    dismiss: (toastId?: string) => void;
  } & Toast;
}

const InterestAnalyzer: React.FC<InterestAnalyzerProps> = ({
  straicoKey,
  isLoading,
  setIsLoading,
  setShowResults,
  setIsInterestSelectorCollapsed,
  setUseCases,
  isInterestSelectorCollapsed,
  toast
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const getInterestName = (id: string): string => {
    const interest = InterestSelector.predefinedInterests?.find((i) => i.id === id);
    return interest ? interest.name : "";
  };

  const handleInterestSelect = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((interest) => interest !== id)
        : [...prev, id]
    );
  };

  const handleAnalyze = async () => {
    if (!straicoKey) {
      toast({
        title: "Straico API Key Required",
        description: "Please enter your Straico API key to use the RAG functionality",
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
    setIsInterestSelectorCollapsed(true);
    try {
      const combinations = generateCombinations(selectedInterests);
      const prompt = generatePrompt(combinations.map(combo => combo.map(getInterestName)));

      const response = await fetch('https://api.straico.com/v0/rag/prompt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${straicoKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          model: "anthropic/claude-3.5-sonnet"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      const aiResponse = data.response.answer;

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
        description: "Failed to generate AI responses. Please check your Straico API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Select Your Interests</h2>
      <InterestSelector
        selectedInterests={selectedInterests}
        onInterestSelect={handleInterestSelect}
        isCollapsed={isInterestSelectorCollapsed}
      />
      <AnalysisButton
        isLoading={isLoading}
        disabled={isLoading || selectedInterests.length < 3}
        onClick={handleAnalyze}
      />
    </>
  );
};

export default InterestAnalyzer;