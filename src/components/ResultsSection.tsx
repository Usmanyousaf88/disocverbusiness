import React from "react";
import BusinessIdeaCard from "./BusinessIdeaCard";
import BusinessIdeaSkeleton from "./loading/BusinessIdeaSkeleton";
import AnalysisProgress from "./loading/AnalysisProgress";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
  isLoading?: boolean;
  analysisStage?: "generating" | "analyzing" | "complete";
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  showResults, 
  useCases, 
  straicoKey, 
  isLoading = false,
  analysisStage = "complete" 
}) => {
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

  if (isLoading) {
    return (
      <div className="space-y-8">
        <AnalysisProgress stage={analysisStage} />
        {[1, 2, 3].map((i) => (
          <BusinessIdeaSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary animate-pulse" />
        <h2 className="text-2xl font-bold text-primary">Your AI-Generated Business Ideas</h2>
      </div>
      
      {/* Success Metrics Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-white/80 backdrop-blur-sm">
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
      </motion.div>

      {/* Business Ideas Cards */}
      {useCases.map((useCase, index) => {
        if (!useCase.aiResponse) return null;
        
        const ideas = splitIdeasFromResponse(useCase.aiResponse);
        
        return (
          <motion.div 
            key={useCase.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
              <h3 className="text-xl font-semibold text-primary mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-500">Target Audience:</span>
                <p className="text-gray-700">{useCase.audience}</p>
              </div>
              {useCase.price && (
                <div className="mt-4 flex gap-4 text-sm">
                  <div className="bg-white/50 p-2 rounded">
                    <p className="text-gray-600">Processing Cost: ${useCase.price.total.toFixed(2)}</p>
                  </div>
                  <div className="bg-white/50 p-2 rounded">
                    <p className="text-gray-600">Words Processed: {useCase.words?.total}</p>
                  </div>
                </div>
              )}
            </Card>
            
            <div className="grid grid-cols-1 gap-6">
              {ideas.map((idea, ideaIndex) => (
                <motion.div
                  key={`${useCase.title}-idea-${ideaIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + ideaIndex * 0.1 }}
                >
                  <BusinessIdeaCard
                    idea={idea}
                    index={ideaIndex}
                    straicoKey={straicoKey}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ResultsSection;
