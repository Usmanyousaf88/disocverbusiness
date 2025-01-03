import React, { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import InterestSelector from "@/components/InterestSelector";
import AnalysisButton from "@/components/AnalysisButton";
import ModelSelector from "@/components/ModelSelector";

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

const prompt = `As an expert business strategist and startup consultant, I'll help you create 5 innovative, market-ready business concepts that combine these interests/skills: ${interestNames.join(", ")}. 

For each business idea, I'll craft a compelling narrative that showcases its unique value proposition and market potential. Structure each idea as follows:

🎯 [IDEA NAME] - Start with a catchy, memorable business name that captures the essence of the concept

📝 Overview
Begin with an engaging executive summary that paints a vivid picture of the business concept, its core value proposition, and why it's exciting and timely in today's market.

1. "The Big Idea"
- Start with a hook that captures attention
- Explain the unique innovation or approach
- Highlight what makes this business special
Summary: A powerful one-liner that encapsulates the core concept

2. "Who It's For"
- Create detailed customer personas
- Identify specific pain points and needs
- Explain how this solution transforms their experience
Summary: Crystal-clear target audience definition

3. "The Money Story"
- Break down primary and secondary revenue streams
- Include specific pricing strategies and examples
- Show path to profitability
Summary: Compelling revenue model explanation

4. "Getting Started"
- Outline concrete first steps and milestones
- Include resource requirements
- Provide actionable launch strategy
Summary: Clear roadmap to launch

5. "Growth Path"
- Detail expansion opportunities
- Include market size and potential
- Outline scaling strategies
Summary: Exciting growth trajectory

6. "Success Factors"
- List critical elements for success
- Include competitive advantages
- Highlight unique opportunities
Summary: Key drivers of success

Make each idea feel like a story worth investing in. Use conversational language while maintaining professional insight. Focus on:
- Market viability and current trends
- Realistic implementation steps
- Clear competitive advantages
- Innovative combinations of the selected interests
- Sustainable business models
- Technology integration where relevant
- Social impact potential
- Scalability factors

Separate each complete business idea with "---" between them.

Please provide exactly 5 well-researched, market-ready business ideas that creatively combine these interests into viable ventures. Number each idea (IDEA #1, IDEA #2, etc.) and ensure each has a unique angle and approach.`;

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

      // Ensure we only create one completion per model
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
        description: "Generated innovative business opportunities based on your interests",
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