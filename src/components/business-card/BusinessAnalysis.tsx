import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { sections } from './analysisPrompts';

interface BusinessAnalysisProps {
  idea: string;
  straicoKey: string;
  onAnalysisComplete: (response: string) => void;
}

export const analyzeBusinessIdea = async (
  idea: string,
  straicoKey: string,
  sections: Record<string, string>
): Promise<string> => {
  console.log('Analyzing business idea with Straico...');
  
  const response = await fetch('https://api.straico.com/v0/rag/prompt', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${straicoKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: JSON.stringify({ sections }),
      model: "anthropic/claude-3.5-sonnet"
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI response');
  }

  const data = await response.json();
  return data.response.answer;
};

const BusinessAnalysis: React.FC<BusinessAnalysisProps> = ({ 
  idea, 
  straicoKey, 
  onAnalysisComplete 
}) => {
  const { toast } = useToast();

  const handleAnalysis = async () => {
    try {
      const analysisResponse = await analyzeBusinessIdea(idea, straicoKey, sections);
      onAnalysisComplete(analysisResponse);
      
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
    }
  };

  return null; // This is a logic-only component
};

export default BusinessAnalysis;