import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { ArrowDownCircle, Lightbulb, Target, Building2 } from "lucide-react";

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
              return `<div class="text-3xl font-bold mb-4 text-primary bg-primary/5 p-4 rounded-lg">${content.join(':').trim()}</div>`;
            } else if (header.trim() === 'Example business or person') {
              return `<div class="flex items-center gap-2 text-sm text-gray-600 italic mb-6">
                        <Building2 className="w-4 h-4" />
                        Similar to: ${content.join(':').trim()}
                      </div>`;
            }
          }
          return section;
        });

      return `
        <div class="flex items-start gap-3 mb-6">
          <Lightbulb class="w-6 h-6 text-primary mt-1" />
          <div class="text-lg leading-relaxed text-gray-700">${mainIdea}</div>
        </div>
        ${formattedSections.join('\n')}
      `;
    }

    return formattedText;
  };

  const formatDeepDiveResponse = (response: string): string => {
    // Replace numbered lists with icons and better formatting
    return response.replace(/^\d\.\s/gm, '• ') // Replace numbers with bullets
      .replace(/^(Business names:|First steps:|Find clients:|Offer ideas:|Practice:)/gm, 
        '<div class="text-xl font-semibold text-primary mt-6 mb-3">$1</div>')
      .replace(/^•\s(.+)$/gm, 
        '<div class="flex items-center gap-2 mb-2"><Target class="w-4 h-4 text-primary" /><span>$1</span></div>');
  };

  const handleDiveDeeper = async () => {
    setLoadingDeepDive(true);
    try {
      const prompt = `This is my business idea to follow my passions and provide value for others so i can make an income:
${idea}

Please analyze the internet if there is potential for this idea to work. based on the analysis, give me a reasoned reaction in 3 sentences and then provide me with the following:

Business names:
• 5 catchy and memorable business names for this plan

First steps:
• The first 5 simple steps to start this business

Find clients:
• 5 effective ways to find your first clients

Offer ideas:
• 5 compelling offers to attract initial clients

Practice:
• 5 low-cost ways to test and validate this idea

Please format the response clearly with these exact headings and bullet points.`;

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
        description: "Scroll down to see your personalized business roadmap",
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
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${getGradientClass(index)}`}>
      <div className="p-8">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: formatText(idea)
          }}
        />
        
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleDiveDeeper}
            disabled={loadingDeepDive}
            className="bg-primary hover:bg-primary-hover text-white transition-colors duration-300 flex items-center gap-2 text-lg px-6 py-6 rounded-xl"
          >
            {loadingDeepDive ? (
              <>Analyzing...</>
            ) : (
              <>
                <ArrowDownCircle className="w-5 h-5" />
                Get Your Business Roadmap
              </>
            )}
          </Button>
        </div>

        {deepDiveResponse && !loadingDeepDive && (
          <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-inner">
            <h4 className="text-2xl font-semibold text-primary mb-6">Your Business Roadmap:</h4>
            <div 
              className="prose prose-lg max-w-none space-y-4"
              dangerouslySetInnerHTML={{ 
                __html: formatDeepDiveResponse(deepDiveResponse)
              }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default BusinessIdeaCard;