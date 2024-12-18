import React, { useState } from "react";
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

  const splitIdeasFromResponse = (response: string): string[] => {
    const ideas = response.split(/---+/).map(idea => idea.trim()).filter(Boolean);
    return ideas;
  };

  const formatText = (text: string): string => {
    // Remove "Business Idea:" from the text
    let formattedText = text.replace(/Business Idea:/g, '');
    
    // Replace markdown bold syntax with HTML bold tags
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Split the text into sections based on common headers
    const sections = formattedText.split(/(?=\n(?:Combination of interests used:|Potential Clients|Daily Tasks|Pricing|First Client|Timeline|Similar Business|Example business or person):)/g);
    
    if (sections.length > 1) {
      // Format the first section (main idea) differently
      const mainIdea = sections[0].trim();
      
      // Extract the combination of interests section
      const interestsSection = sections.find(section => section.includes("Combination of interests used"))?.split(':')[1]?.trim() || '';
      
      // Format the remaining sections with better spacing and structure
      const formattedSections = sections.slice(1)
        .filter(section => !section.includes("Combination of interests used"))
        .map(section => {
          const [header, ...content] = section.split(':');
          if (header && content) {
            return `<div class="mt-6">
              <strong class="text-primary block mb-2 text-lg">${header.trim()}:</strong>
              <div class="text-base text-gray-700 leading-relaxed">${content.join(':').trim()}</div>
            </div>`;
          }
          return section;
        });

      return `
        <div class="text-2xl font-semibold mb-2 text-primary">${mainIdea}</div>
        <div class="text-sm text-gray-500 mb-6 italic">${interestsSection}</div>
        ${formattedSections.join('\n')}
      `;
    }

    return formattedText;
  };

  const getGradientClass = (index: number): string => {
    const gradients = [
      'bg-gradient-to-br from-purple-100 via-white to-purple-50',
      'bg-gradient-to-br from-blue-100 via-white to-blue-50',
      'bg-gradient-to-br from-green-100 via-white to-green-50',
      'bg-gradient-to-br from-pink-100 via-white to-pink-50',
      'bg-gradient-to-br from-yellow-100 via-white to-yellow-50'
    ];
    return gradients[index % gradients.length];
  };

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
      {useCases.map((useCase, index) => {
        const ideas = useCase.aiResponse ? splitIdeasFromResponse(useCase.aiResponse) : [];
        
        return ideas.map((idea, ideaIndex) => (
          <div 
            key={`${index}-${ideaIndex}`} 
            className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${getGradientClass(ideaIndex)}`}
          >
            <div className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: formatText(idea)
                }}
              />
              <div className="mt-6">
                <Button
                  onClick={() => handleDiveDeeper(idea, index)}
                  disabled={loadingDeepDive === index}
                  className="bg-primary hover:bg-primary-hover text-white transition-colors duration-300"
                >
                  {loadingDeepDive === index ? "Analyzing..." : "Dive deeper"}
                </Button>
              </div>
              {useCase.deepDiveResponse && loadingDeepDive === null && (
                <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-inner">
                  <h4 className="text-xl font-semibold text-primary mb-4">Detailed Analysis:</h4>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formatText(useCase.deepDiveResponse)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ));
      })}
    </div>
  );
};

export default ResultsSection;