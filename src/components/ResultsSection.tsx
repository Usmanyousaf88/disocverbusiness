import React from "react";
import BusinessIdeaCard from "./BusinessIdeaCard";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles } from "lucide-react";

interface UseCase {
  title: string;
  description: string;
  steps: string[];
  audience: string;
  prompt: string;
  aiResponse?: string;
  price?: {
    input: number;
    output: number;
    total: number;
  };
  words?: {
    input: number;
    output: number;
    total: number;
  };
}

interface ResultsSectionProps {
  showResults: boolean;
  useCases: UseCase[];
  straicoKey: string;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ showResults, useCases, straicoKey }) => {
  if (!showResults) return null;

  const splitIdeasFromResponse = (response: string): string[] => {
    const ideas = response.split(/---+/).map(idea => idea.trim()).filter(Boolean);
    return ideas;
  };

  // Calculate success metrics based on keywords in the response
  const calculateSuccessMetrics = (response: string) => {
    const positiveKeywords = ['profitable', 'growing market', 'high demand', 'scalable', 'innovative'];
    const score = positiveKeywords.reduce((acc, keyword) => {
      return acc + (response.toLowerCase().includes(keyword.toLowerCase()) ? 20 : 0);
    }, 0);
    return Math.min(score, 100); // Cap at 100%
  };

  // Prepare data for the chart
  const chartData = useCases.flatMap((useCase) => {
    if (!useCase.aiResponse) return [];
    
    const ideas = splitIdeasFromResponse(useCase.aiResponse);
    return ideas.map((idea, index) => ({
      name: `Idea ${index + 1}`,
      successScore: calculateSuccessMetrics(idea),
      costEfficiency: useCase.price ? Math.round((100 - (useCase.price.total / 10)) * 10) / 10 : 0,
    }));
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        <h2 className="text-2xl font-bold text-primary">Your AI-Generated Business Ideas</h2>
      </div>
      
      {/* Success Metrics Chart */}
      <Card className="p-6 bg-gradient-to-br from-white via-purple-50 to-primary-light/10 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-purple-100">
        <h3 className="text-xl font-semibold text-primary mb-4">Business Ideas Success Metrics</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="successScore" name="Success Score" fill="#8B5CF6" />
              <Bar dataKey="costEfficiency" name="Cost Efficiency" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Business Ideas Cards */}
      {useCases.map((useCase) => {
        if (!useCase.aiResponse) return null;
        
        const ideas = splitIdeasFromResponse(useCase.aiResponse);
        
        return (
          <div key={useCase.title} className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:to-primary/5 transition-all duration-300">
              <h3 className="text-xl font-semibold text-primary mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-500">Target Audience:</span>
                <p className="text-gray-700">{useCase.audience}</p>
              </div>
              {useCase.price && (
                <div className="mt-4 flex gap-4 text-sm">
                  <div className="bg-white/50 p-2 rounded-lg shadow-sm">
                    <p className="text-gray-600">Processing Cost: ${useCase.price.total.toFixed(2)}</p>
                  </div>
                  <div className="bg-white/50 p-2 rounded-lg shadow-sm">
                    <p className="text-gray-600">Words Processed: {useCase.words?.total}</p>
                  </div>
                </div>
              )}
            </Card>
            
            <div className="grid grid-cols-1 gap-6">
              {ideas.map((idea, ideaIndex) => (
                <BusinessIdeaCard
                  key={`idea-${ideaIndex}`}
                  idea={idea}
                  index={ideaIndex}
                  straicoKey={straicoKey}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsSection;