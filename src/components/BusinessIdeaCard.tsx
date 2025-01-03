import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { ArrowDownCircle, Sparkles, Star, Users, Coins, Rocket, Target, Trophy } from "lucide-react";
import FilterButtons, { type ResultSection } from "./business-card/FilterButtons";
import ResultContent from "./business-card/ResultContent";
import IdeaSection from "./business-card/IdeaSection";
import SectionSummary from "./business-card/SectionSummary";

interface BusinessIdeaCardProps {
  idea: string;
  index: number;
  straicoKey: string;
}

const BusinessIdeaCard = ({ idea, index, straicoKey }: BusinessIdeaCardProps) => {
  const [loadingDeepDive, setLoadingDeepDive] = useState(false);
  const [deepDiveResponse, setDeepDiveResponse] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<ResultSection>('all');
  const [isReady, setIsReady] = useState(false);
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
    bigIdea: idea.match(/The Big Idea[:\n]+(.*?)(?=Summary:|Who It's For|$)/s)?.[1]?.trim() || "",
    bigIdeaSummary: idea.match(/Summary:[:\n]+(.*?)(?=Who It's For|$)/s)?.[1]?.trim() || "",
    audience: idea.match(/Who It's For[:\n]+(.*?)(?=Summary:|The Money Story|$)/s)?.[1]?.trim() || "",
    audienceSummary: idea.match(/Summary:[:\n]+(.*?)(?=The Money Story|$)/s)?.[1]?.trim() || "",
    moneyStory: idea.match(/The Money Story[:\n]+(.*?)(?=Summary:|Getting Started|$)/s)?.[1]?.trim() || "",
    moneyStorySummary: idea.match(/Summary:[:\n]+(.*?)(?=Getting Started|$)/s)?.[1]?.trim() || "",
    gettingStarted: idea.match(/Getting Started[:\n]+(.*?)(?=Summary:|Growth Path|$)/s)?.[1]?.trim() || "",
    gettingStartedSummary: idea.match(/Summary:[:\n]+(.*?)(?=Growth Path|$)/s)?.[1]?.trim() || "",
    growthPath: idea.match(/Growth Path[:\n]+(.*?)(?=Summary:|Success Factors|$)/s)?.[1]?.trim() || "",
    growthPathSummary: idea.match(/Summary:[:\n]+(.*?)(?=Success Factors|$)/s)?.[1]?.trim() || "",
    successFactors: idea.match(/Success Factors[:\n]+(.*?)(?=Summary:|$)/s)?.[1]?.trim() || "",
    successFactorsSummary: idea.match(/Success Factors.*?Summary:[:\n]+(.*?)$/s)?.[1]?.trim() || "",
  };

  useEffect(() => {
    // Validate that all required sections have content
    const hasAllSections = Object.values(sections).every(section => section.length > 0);
    console.log('Sections validation:', hasAllSections, sections);
    setIsReady(hasAllSections);
  }, [sections]);

  const handleDiveDeeper = async () => {
    setLoadingDeepDive(true);
    try {
      console.log('Starting deep dive analysis...');
      const prompt = {
        sections: {
          productDevelopment: `Analyze this business idea and provide detailed insights on product development (min 500 words):
${sections.bigIdea}

Focus on:
1. Core features and unique value proposition
2. Technical requirements and implementation
3. Development timeline and key milestones
4. MVP scope and initial features
5. Product roadmap and future enhancements`,

          marketValidation: `For this business idea, provide comprehensive market analysis (min 500 words):
${sections.audience}

Cover:
1. Target market size and demographics
2. Customer pain points and needs
3. Market opportunities and gaps
4. Competitive landscape analysis
5. Market entry strategy`,

          monetization: `Based on this concept, detail the monetization approach (min 500 words):
${sections.moneyStory}

Include:
1. Primary and secondary revenue streams
2. Pricing strategy and models
3. Customer acquisition costs
4. Potential upsell opportunities
5. Financial projections and breakeven analysis`,

          operations: `For implementing this business, outline operational requirements (min 500 words):
${sections.gettingStarted}

Detail:
1. Team structure and key roles
2. Required resources and tools
3. Core processes and workflows
4. Quality assurance measures
5. Risk management and mitigation strategies`,

          growth: `To scale this business, provide comprehensive growth strategies (min 500 words):
${sections.growthPath}

Include:
1. Expansion roadmap
2. Partnership opportunities
3. Market penetration tactics
4. Future development plans
5. Success metrics and KPIs`
        }
      };

      console.log('Sending analysis request to Straico API with prompt:', prompt);
      const response = await fetch('https://api.straico.com/v0/rag/prompt', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${straicoKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: JSON.stringify(prompt),
          model: "anthropic/claude-3.5-sonnet",
          max_tokens: 4000
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      console.log('Received analysis response:', data);
      
      if (data.response?.answer) {
        setDeepDiveResponse(data.response.answer);
        toast({
          title: "Analysis Complete",
          description: "Your comprehensive business roadmap is ready to explore",
        });
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to generate analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingDeepDive(false);
    }
  };

  // Validate sections before rendering
  useEffect(() => {
    const hasAllSections = Object.values(sections).every(section => {
      const content = section.trim();
      console.log('Validating section content:', content ? 'Has content' : 'Empty');
      return content.length > 0;
    });
    console.log('All sections validation result:', hasAllSections);
    setIsReady(hasAllSections);
  }, [sections]);

  if (!isReady) {
    console.log('Card not ready - missing section content');
    return null;
  }

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
            <SectionSummary summary={sections.bigIdeaSummary} />
          </div>

          {/* Other Sections */}
          <IdeaSection
            title="Who It's For"
            content={sections.audience}
            summary={sections.audienceSummary}
            icon={<Users className="w-5 h-5" />}
          />

          <IdeaSection
            title="The Money Story"
            content={sections.moneyStory}
            summary={sections.moneyStorySummary}
            className="bg-primary/5"
            icon={<Coins className="w-5 h-5" />}
          />

          <IdeaSection
            title="Getting Started"
            content={sections.gettingStarted}
            summary={sections.gettingStartedSummary}
            icon={<Rocket className="w-5 h-5" />}
          />

          <IdeaSection
            title="Growth Path"
            content={sections.growthPath}
            summary={sections.growthPathSummary}
            className="bg-primary/5"
            icon={<Target className="w-5 h-5" />}
          />

          <IdeaSection
            title="Success Factors"
            content={sections.successFactors}
            summary={sections.successFactorsSummary}
            icon={<Trophy className="w-5 h-5" />}
          />
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
              <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <ResultContent 
                  content={deepDiveResponse.split('\n')}
                  activeSection={activeSection}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BusinessIdeaCard;