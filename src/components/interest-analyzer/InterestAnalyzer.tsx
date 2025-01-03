import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import InterestSelector from "@/components/InterestSelector";
import AnalysisButton from "@/components/AnalysisButton";
import ModelSelector from "@/components/ModelSelector";
import { generatePrompt } from "@/utils/combinationGenerator";

interface InterestAnalyzerProps {
  straicoKey: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setShowResults: (show: boolean) => void;
  setIsInterestSelectorCollapsed: (collapsed: boolean) => void;
  setUseCases: (useCases: any[]) => void;
  isInterestSelectorCollapsed: boolean;
}

const InterestAnalyzer: React.FC<InterestAnalyzerProps> = ({
  straicoKey,
  isLoading,
  setIsLoading,
  setShowResults,
  setIsInterestSelectorCollapsed,
  setUseCases,
  isInterestSelectorCollapsed,
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);

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
        description: "Please enter your Straico API key to use the functionality",
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

    if (selectedModels.length === 0) {
      toast({
        title: "Please select at least one model",
        description: "Select one or more AI models to analyze your interests",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsInterestSelectorCollapsed(true);
    
    try {
      console.log('Making request to Straico API with key:', straicoKey.substring(0, 4) + '...');
      const interestNames = selectedInterests.map(getInterestName);
      const prompt = `Generate innovative business ideas that combine these interests/skills: ${interestNames.join(", ")}. 
      For each combination, provide detailed analysis including target market, revenue potential, and implementation steps.
      Format each idea with "---" between them.`;

      const response = await fetch('https://api.straico.com/v1/prompt/completion', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${straicoKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          models: selectedModels,
          message: prompt
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Straico API error:', errorData);
        throw new Error(errorData.message || 'Failed to fetch AI response');
      }

      const data = await response.json();
      console.log('Straico API response:', data);

      const completions = Object.entries(data.data.completions).map(([model, completion]: [string, any]) => ({
        title: `${model.split('/')[1]} Analysis`,
        description: "AI-generated business opportunities based on your interests",
        steps: ["Analyze market opportunities", "Identify target audience", "Create initial offering", "Test and validate"],
        audience: "Entrepreneurs interested in " + selectedInterests.map(getInterestName).join(", "),
        prompt: prompt,
        aiResponse: completion.completion.choices[0].message.content,
        price: completion.price,
        words: completion.words
      }));

      setUseCases(completions);
      setShowResults(true);
      
      toast({
        title: "Success!",
        description: "Generated business opportunities based on your interests",
      });
    } catch (error) {
      console.error('Error in handleAnalyze:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate AI responses. Please check your Straico API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Select Your Interests</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Choose AI Models</h3>
          <ModelSelector 
            selectedModels={selectedModels}
            onModelsSelect={setSelectedModels}
            straicoKey={straicoKey}
          />
        </div>

        <InterestSelector
          selectedInterests={selectedInterests}
          onInterestSelect={handleInterestSelect}
          isCollapsed={isInterestSelectorCollapsed}
        />
        
        <AnalysisButton
          isLoading={isLoading}
          disabled={isLoading || selectedInterests.length < 3 || selectedModels.length === 0}
          onClick={handleAnalyze}
        />
      </div>
    </>
  );
};

export default InterestAnalyzer;