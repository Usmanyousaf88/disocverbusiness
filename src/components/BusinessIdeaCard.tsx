import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { 
  ArrowDownCircle, 
  Lightbulb, 
  Target, 
  Building2,
  ChartPieIcon,
  Users,
  BookOpen,
  TrendingUp,
  Wallet,
  Calendar,
  Megaphone,
  AlertTriangle,
  Network,
  GraduationCap
} from "lucide-react";

interface BusinessIdeaCardProps {
  idea: string;
  index: number;
  apiKey: string;
}

type ResultSection = 
  | 'all'
  | 'business-model'
  | 'success-stories'
  | 'resources'
  | 'market'
  | 'financial'
  | 'timeline'
  | 'marketing'
  | 'risks'
  | 'networking'
  | 'learning';

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
    return response.replace(/^\d\.\s/gm, '• ')
      .replace(/^(Business Model:|Success Stories:|Resource Directory:|Market Analysis:|Financial Projections:|Implementation Timeline:|Marketing Strategy:|Risk Assessment:|Networking Opportunities:|Learning Resources:|Business names:|First steps:|Find clients:|Offer ideas:|Practice:)/gm, 
        '<div class="text-xl font-semibold text-primary mt-6 mb-3">$1</div>')
      .replace(/^•\s(.+)$/gm, 
        '<div class="flex items-center gap-2 mb-2"><Target class="w-4 h-4 text-primary" /><span>$1</span></div>');
  };

  const filterButtons = [
    { id: 'all', label: 'All Results', icon: Target },
    { id: 'business-model', label: 'Business Model', icon: ChartPieIcon },
    { id: 'success-stories', label: 'Success Stories', icon: Users },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'market', label: 'Market Analysis', icon: TrendingUp },
    { id: 'financial', label: 'Financial', icon: Wallet },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'risks', label: 'Risks', icon: AlertTriangle },
    { id: 'networking', label: 'Networking', icon: Network },
    { id: 'learning', label: 'Learning', icon: GraduationCap }
  ];

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

  const filterContent = (content: string | null, section: ResultSection): string => {
    if (!content) return '';
    
    const sections: Record<ResultSection, string> = {
      'all': content,
      'business-model': content.split('Success Stories:')[0],
      'success-stories': content.split('Success Stories:')[1]?.split('Resource Directory:')[0] || '',
      'resources': content.split('Resource Directory:')[1]?.split('Market Analysis:')[0] || '',
      'market': content.split('Market Analysis:')[1]?.split('Financial Projections:')[0] || '',
      'financial': content.split('Financial Projections:')[1]?.split('Implementation Timeline:')[0] || '',
      'timeline': content.split('Implementation Timeline:')[1]?.split('Marketing Strategy:')[0] || '',
      'marketing': content.split('Marketing Strategy:')[1]?.split('Risk Assessment:')[0] || '',
      'risks': content.split('Risk Assessment:')[1]?.split('Networking Opportunities:')[0] || '',
      'networking': content.split('Networking Opportunities:')[1]?.split('Learning Resources:')[0] || '',
      'learning': content.split('Learning Resources:')[1] || ''
    };
    
    return sections[section] || '';
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
              <div className="flex flex-wrap gap-2 justify-center">
                {filterButtons.map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    onClick={() => setActiveSection(id as ResultSection)}
                    variant={activeSection === id ? "default" : "outline"}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>

              <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-inner">
                <h4 className="text-2xl font-semibold text-primary mb-6">Your Business Roadmap:</h4>
                <div 
                  className="prose prose-lg max-w-none space-y-4"
                  dangerouslySetInnerHTML={{ 
                    __html: formatDeepDiveResponse(filterContent(deepDiveResponse, activeSection))
                  }}
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