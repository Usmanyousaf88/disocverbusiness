import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import {
  ArrowDownCircle, Lightbulb, Target, Building2,
  ChartPie, Award, Link, Users, DollarSign,
  Calendar, Megaphone, ShieldAlert, BookOpen,
  ChartBar, TrendingUp, Clock, AlertOctagon, Handshake
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface BusinessIdeaCardProps {
  idea: string;
  index: number;
  apiKey: string;
}

const BusinessIdeaCard = ({ idea, index, apiKey }: BusinessIdeaCardProps) => {
  const [loadingDeepDive, setLoadingDeepDive] = useState(false);
  const [deepDiveResponse, setDeepDiveResponse] = useState<string | null>(null);
  const { toast } = useToast();

  // Sample data for charts
  const revenueData = [
    { name: 'Year 1', value: 30 },
    { name: 'Year 2', value: 60 },
    { name: 'Year 3', value: 100 }
  ];

  const marketShareData = [
    { name: 'Your Business', value: 30 },
    { name: 'Competitors', value: 70 }
  ];

  const COLORS = ['#8B5CF6', '#C4B5FD'];

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
                        <Building2 class="w-4 h-4" />
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

Please provide a comprehensive analysis including:

1. Initial Analysis:
- A reasoned reaction in 3 sentences
- 5 catchy business names
- First 5 steps to start
- 5 ways to find clients
- 5 compelling offers
- 5 validation methods

2. Business Model:
- Revenue streams
- Startup costs
- Market size estimation

3. Success Stories:
- 3 similar success stories
- Key success factors
- Common challenges overcome

4. Market Analysis:
- Target audience demographics
- Main competitors
- Current market trends

5. Financial Projections:
- First year cost breakdown
- Revenue potential
- Break-even timeline

6. Implementation Timeline:
- 30/60/90 day plan
- Key milestones
- Success metrics

7. Marketing Strategy:
- Recommended channels
- Content ideas
- Customer acquisition methods

8. Risk Assessment:
- Potential challenges
- Regulatory considerations
- Mitigation strategies

9. Networking Opportunities:
- Industry events
- Professional associations
- Online communities

10. Learning Resources:
- Recommended courses
- Essential books
- Industry certifications

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
        description: "Scroll down to see your comprehensive business analysis",
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

  const renderSection = (title: string, icon: React.ReactNode, content: string) => (
    <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
      </div>
      <div className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );

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
                Get Your Complete Business Analysis
              </>
            )}
          </Button>
        </div>

        {deepDiveResponse && !loadingDeepDive && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <ChartPie className="w-5 h-5" />
                  Revenue Projection
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#8B5CF6" fill="#C4B5FD" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <ChartPie className="w-5 h-5" />
                  Market Share Potential
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketShareData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8B5CF6"
                        dataKey="value"
                        label
                      >
                        {marketShareData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {renderSection("Business Model", <ChartPie className="w-6 h-6 text-primary" />, 
              deepDiveResponse.match(/Business Model:[\s\S]*?(?=Success Stories:)/)?.[0] || '')}
            
            {renderSection("Success Stories", <Award className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Success Stories:[\s\S]*?(?=Market Analysis:)/)?.[0] || '')}
            
            {renderSection("Market Analysis", <Users className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Market Analysis:[\s\S]*?(?=Financial Projections:)/)?.[0] || '')}
            
            {renderSection("Financial Projections", <DollarSign className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Financial Projections:[\s\S]*?(?=Implementation Timeline:)/)?.[0] || '')}
            
            {renderSection("Implementation Timeline", <Calendar className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Implementation Timeline:[\s\S]*?(?=Marketing Strategy:)/)?.[0] || '')}
            
            {renderSection("Marketing Strategy", <Megaphone className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Marketing Strategy:[\s\S]*?(?=Risk Assessment:)/)?.[0] || '')}
            
            {renderSection("Risk Assessment", <ShieldAlert className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Risk Assessment:[\s\S]*?(?=Networking Opportunities:)/)?.[0] || '')}
            
            {renderSection("Networking Opportunities", <Handshake className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Networking Opportunities:[\s\S]*?(?=Learning Resources:)/)?.[0] || '')}
            
            {renderSection("Learning Resources", <BookOpen className="w-6 h-6 text-primary" />,
              deepDiveResponse.match(/Learning Resources:[\s\S]*$/)?.[0] || '')}
          </div>
        )}
      </div>
    </Card>
  );
};

export default BusinessIdeaCard;