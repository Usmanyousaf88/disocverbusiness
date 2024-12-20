import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { ArrowDownCircle } from "lucide-react";
import FilterButtons, { type ResultSection } from "./business-card/FilterButtons";
import ResultContent from "./business-card/ResultContent";
import BusinessIdeaHeader from "./business-card/BusinessIdeaHeader";

interface BusinessIdeaCardProps {
  idea: string;
  index: number;
  apiKey: string;
}

const BusinessIdeaCard = ({ idea, index, apiKey }: BusinessIdeaCardProps) => {
  const [loadingDeepDive, setLoadingDeepDive] = useState(false);
  const [deepDiveResponse, setDeepDiveResponse] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<ResultSection>('all');
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

  const handleDiveDeeper = async () => {
    setLoadingDeepDive(true);
    try {
      const prompt = `This is my business idea to follow my passions and provide value for others so i can make an income:
${idea}

Please analyze this business idea and provide a comprehensive breakdown including:

Business Model:
• Revenue streams and business model analysis
• Key partnerships and resources needed
• Cost structure overview

Success Stories:
• Examples of similar successful businesses
• Key success factors and metrics
• Notable achievements in this space

Resource Directory:
• Essential tools and platforms
• Recommended software or services
• Industry-specific resources

Market Analysis:
• Target audience demographics
• Competitor landscape
• Market trends and opportunities

Financial Projections:
• Estimated startup costs
• Potential revenue calculations
• Break-even analysis

Implementation Timeline:
• 30/60/90 day action plan
• Key milestones
• Critical success metrics

Marketing Strategy:
• Recommended marketing channels
• Content strategy outline
• Customer acquisition approach

Risk Assessment:
• Common challenges and solutions
• Regulatory considerations
• Market risks and mitigation

Networking Opportunities:
• Relevant industry events
• Professional associations
• Online communities

Learning Resources:
• Recommended courses
• Books and publications
• Industry certifications

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
        <BusinessIdeaHeader idea={idea} />
        
        <div className="mt-8 flex flex-col items-center gap-4">
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

          {deepDiveResponse && !loadingDeepDive && (
            <div className="w-full space-y-4">
              <FilterButtons 
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
              <ResultContent 
                content={deepDiveResponse}
                activeSection={activeSection}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BusinessIdeaCard;