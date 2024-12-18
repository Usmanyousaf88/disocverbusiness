import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface BusinessIdeaCardProps {
  idea: string;
  index: number;
  apiKey: string;
}

const BusinessIdeaCard = ({ idea, index, apiKey }: BusinessIdeaCardProps) => {
  const [loadingDeepDive, setLoadingDeepDive] = useState(false);
  const [deepDiveResponse, setDeepDiveResponse] = useState<string | null>(null);
  const { toast } = useToast();

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

  const formatText = (text: string): string => {
    let formattedText = text.replace(/Business Idea:/g, '');
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Split by sections
    const sections = formattedText.split(/(?=\n(?:Name:|Example business or person:))/g);
    
    if (sections.length > 1) {
      const mainIdea = sections[0].trim();
      
      const formattedSections = sections.slice(1)
        .map(section => {
          const [header, ...content] = section.split(':');
          if (header && content) {
            if (header.trim() === 'Name') {
              return `<div class="text-2xl font-bold mb-2 text-primary">${content.join(':').trim()}</div>`;
            } else if (header.trim() === 'Example business or person') {
              return `<div class="text-sm text-gray-600 italic mb-4">Similar to: ${content.join(':').trim()}</div>`;
            }
          }
          return section;
        });

      return formattedSections.join('\n');
    }

    return formattedText;
  };

  const handleDiveDeeper = async () => {
    setLoadingDeepDive(true);
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
      setDeepDiveResponse(deepDiveResponse);

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
      setLoadingDeepDive(false);
    }
  };

  return (
    <div 
      className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${getGradientClass(index)}`}
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
            onClick={handleDiveDeeper}
            disabled={loadingDeepDive}
            className="bg-primary hover:bg-primary-hover text-white transition-colors duration-300"
          >
            {loadingDeepDive ? "Analyzing..." : "Dive deeper"}
          </Button>
        </div>

        {deepDiveResponse && !loadingDeepDive && (
          <div className="mt-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-inner">
            <h4 className="text-lg font-semibold text-primary mb-3">Detailed Analysis:</h4>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formatText(deepDiveResponse)
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessIdeaCard;
