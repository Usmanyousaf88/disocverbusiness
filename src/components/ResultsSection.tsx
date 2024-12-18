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
  const [loadingDeepDive, setLoadingDeepDive] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  if (!showResults) return null;

  const splitIdeasFromResponse = (response: string): string[] => {
    const ideas = response.split(/---+/).map(idea => idea.trim()).filter(Boolean);
    return ideas;
  };

  const formatText = (text: string): string => {
    let formattedText = text.replace(/Business Idea:/g, '');
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    const sections = formattedText.split(/(?=\n(?:Combination of interests used:|Potential Clients|Daily Tasks|Pricing|First Client|Timeline|Similar Business|Example business or person):)/g);
    
    if (sections.length > 1) {
      const mainIdea = sections[0].trim();
      const interestsSection = sections.find(section => section.includes("Combination of interests used"))?.split(':')[1]?.trim() || '';
      
      const formattedSections = sections.slice(1)
        .filter(section => !section.includes("Combination of interests used"))
        .map(section => {
          const [header, ...content] = section.split(':');
          if (header && content) {
            return `<div class="mt-4">
              <strong class="text-primary block mb-2 text-xs uppercase tracking-wide">${header.trim()}:</strong>
              <div class="text-sm text-gray-600 leading-relaxed">${content.join(':').trim()}</div>
            </div>`;
          }
          return section;
        });

      return `
        <div class="text-2xl font-bold mb-2 text-primary">${mainIdea}</div>
        <div class="text-xs text-gray-400 mb-4 italic">Combination of interests: ${interestsSection}</div>
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

  const handleDiveDeeper = async (idea: string, uniqueKey: string) => {
    setLoadingDeepDive(prev => ({ ...prev, [uniqueKey]: true }));
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
      const [useCaseIndex] = uniqueKey.split('-').map(Number);
      if (useCases[useCaseIndex]) {
        useCases[useCaseIndex] = {
          ...useCases[useCaseIndex],
          deepDiveResponse,
        };
      }

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
      setLoadingDeepDive(prev => ({ ...prev, [uniqueKey]: false }));
    }
  };

  return (
    <div className="space-y-8">
      {useCases.map((useCase, useCaseIndex) => {
        if (!useCase.aiResponse) return null;
        
        const ideas = splitIdeasFromResponse(useCase.aiResponse);
        
        return (
          <div key={useCaseIndex} className="space-y-8">
            {ideas.map((idea, ideaIndex) => {
              const uniqueKey = `${useCaseIndex}-${ideaIndex}`;
              return (
                <div 
                  key={uniqueKey}
                  className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${getGradientClass(ideaIndex)}`}
                >
                  <div className="p-6">
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: formatText(idea)
                      }}
                    />
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => handleDiveDeeper(idea, uniqueKey)}
                        disabled={loadingDeepDive[uniqueKey]}
                        className="bg-primary hover:bg-primary-hover text-white transition-colors duration-300"
                      >
                        {loadingDeepDive[uniqueKey] ? "Analyzing..." : "Dive deeper"}
                      </Button>
                    </div>

                    {useCase.deepDiveResponse && !loadingDeepDive[uniqueKey] && (
                      <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-inner">
                        <h4 className="text-lg font-semibold text-primary mb-3">Detailed Analysis:</h4>
                        <div 
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ 
                            __html: formatText(useCase.deepDiveResponse)
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ResultsSection;