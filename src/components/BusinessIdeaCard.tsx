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

Product Development:
• Core features and functionalities
• Technical requirements and stack
• Development timeline and milestones
• MVP (Minimum Viable Product) scope

Market Validation:
• Target market size and demographics
• Customer pain points and needs
• Market gaps and opportunities
• Competitive advantage analysis

Monetization Strategy:
• Pricing models and tiers
• Revenue streams breakdown
• Subscription vs one-time payment analysis
• Potential upsell opportunities

Technical Infrastructure:
• Required technology stack
• Hosting and deployment needs
• Scalability considerations
• Security requirements

Go-to-Market Strategy:
• Launch strategy and timeline
• Marketing channels and tactics
• Customer acquisition strategy
• Growth hacking opportunities

Business Operations:
• Team structure and roles
• Required skills and expertise
• Operational processes
• Quality assurance measures

Legal and Compliance:
• Required licenses and permits
• Data protection requirements
• Terms of service considerations
• Intellectual property protection

Financial Planning:
• Initial investment required
• Operating costs breakdown
• Revenue projections
• Break-even analysis

Growth Strategy:
• Scaling roadmap
• Partnership opportunities
• Market expansion plans
• Future feature roadmap

Success Metrics:
• Key Performance Indicators (KPIs)
• Customer success metrics
• Financial metrics
• Growth metrics

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