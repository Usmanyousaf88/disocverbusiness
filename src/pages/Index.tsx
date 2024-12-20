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
  const [isInterestSelectorCollapsed, setIsInterestSelectorCollapsed] = useState(false);
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
    setIsInterestSelectorCollapsed(true);
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
          <p className="text-lg text-gray-600 mb-8">
            Select 3 or more interests to explore unique business opportunities
          </p>

          <div className="bg-white rounded-xl p-6 shadow-lg mb-8 text-left animate-fadeIn">
            <h2 className="text-xl font-semibold text-primary mb-4">How It Works:</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</span>
                <p className="text-gray-700">Select at least 3 interests that excite you - these can be your hobbies, skills, or passions.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</span>
                <p className="text-gray-700">Our AI will analyze unique combinations of your interests to discover innovative business opportunities.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</span>
                <p className="text-gray-700">For each idea, you'll get detailed insights including potential business names, target audience, and step-by-step startup guide.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">4</span>
                <p className="text-gray-700">Use the "Dive Deeper" feature to get a complete business roadmap including first steps, potential clients, and marketing strategies.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6 mb-8">
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />

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