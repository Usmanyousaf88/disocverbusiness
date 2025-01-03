import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { ArrowDownCircle, Sparkles, Star } from "lucide-react";
import FilterButtons, { type ResultSection } from "./business-card/FilterButtons";
import ResultContent from "./business-card/ResultContent";
import BusinessIdeaHeader from "./business-card/BusinessIdeaHeader";

interface BusinessIdeaCardProps {
  idea: string;
  index: number;
  straicoKey: string;
}

const BusinessIdeaCard = ({ idea, index, straicoKey }: BusinessIdeaCardProps) => {
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

  // Extract sections from the idea text
  const sections = {
    bigIdea: idea.match(/The Big Idea[:\n]+(.*?)(?=Who It's For|$)/s)?.[1]?.trim() || "",
    audience: idea.match(/Who It's For[:\n]+(.*?)(?=The Money Story|$)/s)?.[1]?.trim() || "",
    moneyStory: idea.match(/The Money Story[:\n]+(.*?)(?=Getting Started|$)/s)?.[1]?.trim() || "",
    gettingStarted: idea.match(/Getting Started[:\n]+(.*?)(?=Growth Path|$)/s)?.[1]?.trim() || "",
    growthPath: idea.match(/Growth Path[:\n]+(.*?)(?=Success Factors|$)/s)?.[1]?.trim() || "",
    successFactors: idea.match(/Success Factors[:\n]+(.*?)$/s)?.[1]?.trim() || "",
  };

  const handleDiveDeeper = async () => {
    setLoadingDeepDive(true);
    try {
      const prompt = {
        sections: {
          productDevelopment: `Analyze this business idea and provide key insights on product development:
${sections.bigIdea}

Focus on:
1. Core features and unique value proposition
2. Technical requirements and implementation
3. Development timeline and key milestones
4. MVP scope and initial features`,

          marketValidation: `For this business idea:
${sections.audience}

Provide market analysis covering:
1. Target market size and demographics
2. Customer pain points and needs
3. Market opportunities and gaps
4. Competitive landscape analysis`,

          monetization: `Based on this concept:
${sections.moneyStory}

Detail the monetization approach:
1. Primary revenue streams
2. Pricing strategy and models
3. Customer acquisition costs
4. Potential upsell opportunities`,

          operations: `For implementing this business:
${sections.gettingStarted}

Outline operational requirements:
1. Team structure and key roles
2. Required resources and tools
3. Core processes and workflows
4. Quality assurance measures`,

          growth: `To scale this business:
${sections.growthPath}

Provide growth strategies covering:
1. Expansion roadmap
2. Partnership opportunities
3. Market penetration tactics
4. Future development plans`
        }
      };

      const response = await fetch('https://api.straico.com/v0/rag/prompt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${straicoKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: JSON.stringify(prompt),
          model: "anthropic/claude-3.5-sonnet"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      const deepDiveResponse = data.response.answer;
      setDeepDiveResponse(deepDiveResponse);

      toast({
        title: "Analysis Complete",
        description: "Your business roadmap is ready to explore",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingDeepDive(false);
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${getGradientClass(index)}`}>
      <div className="p-8">
        <div className="space-y-6">
          {/* Big Idea Section */}
          <div className="border-l-4 border-primary pl-4">
            <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Star className="w-6 h-6" />
              The Big Idea
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">{sections.bigIdea}</p>
          </div>

          {/* Who It's For Section */}
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-lg text-primary mb-2">Who It's For</h4>
            <p className="text-gray-700">{sections.audience}</p>
          </div>

          {/* Money Story Section */}
          <div className="bg-primary/5 rounded-lg p-4">
            <h4 className="font-semibold text-lg text-primary mb-2">The Money Story</h4>
            <p className="text-gray-700">{sections.moneyStory}</p>
          </div>

          {/* Getting Started Section */}
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-lg text-primary mb-2">Getting Started</h4>
            <p className="text-gray-700">{sections.gettingStarted}</p>
          </div>

          {/* Growth Path Section */}
          <div className="bg-primary/5 rounded-lg p-4">
            <h4 className="font-semibold text-lg text-primary mb-2">Growth Path</h4>
            <p className="text-gray-700">{sections.growthPath}</p>
          </div>

          {/* Success Factors Section */}
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-lg text-primary mb-2">Success Factors</h4>
            <p className="text-gray-700">{sections.successFactors}</p>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button
            onClick={handleDiveDeeper}
            disabled={loadingDeepDive}
            className="bg-primary hover:bg-primary-hover text-white transition-colors duration-300 flex items-center gap-2 text-lg px-6 py-6 rounded-xl w-full md:w-auto"
          >
            {loadingDeepDive ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                Analyzing Your Idea...
              </>
            ) : (
              <>
                <ArrowDownCircle className="w-5 h-5" />
                Generate Business Roadmap
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