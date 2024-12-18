import React, { useState } from "react";
import UseCaseCard from "@/components/UseCaseCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  audience: string;
  prompt: string;
  aiResponse?: string;
  deepDiveResponse?: string;
}

interface ResultsSectionProps {
  showResults: boolean;
  useCases: UseCase[];
  apiKey: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ showResults, useCases, apiKey }) => {
  const [loadingDeepDive, setLoadingDeepDive] = useState<number | null>(null);
  const { toast } = useToast();

  if (!showResults) return null;

  const handleDiveDeeper = async (idea: string, index: number) => {
    setLoadingDeepDive(index);
    try {
      const prompt = `This is my business idea to follow my passions and provide value for others so i can make an income:
${idea}

Please analyze the internet if there is potential for this idea to work. based on the analisis, give me a reasoned reaction in 3 sentences and then provide me with the following:
1. 5 nice business names for this plan
2. The first 5 simple steps i need to take to start with this plan
3. Where i can find my first 5 clients
4. 5 great idea's for offers to get my first clients
5. How can i practice this cheap and easy to see if it is a good fit for me

Please return only the requested information properly formatted with good readability`;

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
      const deepDiveResponse = data.choices[0].message.content;

      // Update the specific useCase with the deep dive response
      useCases[index] = {
        ...useCases[index],
        deepDiveResponse,
      };

      toast({
        title: "Deep dive analysis complete",
        description: "Scroll down to see the detailed information",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate deep dive analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingDeepDive(null);
    }
  };

  return (
    <div className="space-y-8">
      {useCases.map((useCase, index) => (
        <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6">
          <UseCaseCard {...useCase} />
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-md">
              <h4 className="font-semibold mb-2">Business Idea:</h4>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {useCase.aiResponse}
              </p>
              <div className="mt-4">
                <Button
                  onClick={() => handleDiveDeeper(useCase.aiResponse || "", index)}
                  disabled={loadingDeepDive === index}
                  className="bg-primary hover:bg-primary-hover text-white"
                >
                  {loadingDeepDive === index ? "Analyzing..." : "Dive deeper"}
                </Button>
              </div>
              {useCase.deepDiveResponse && (
                <div className="mt-6 p-4 bg-blue-50 rounded-md">
                  <h4 className="font-semibold mb-2 text-blue-800">Detailed Analysis:</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {useCase.deepDiveResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsSection;