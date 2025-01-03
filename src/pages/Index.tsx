import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import StraicoKeyInput from "@/components/StraicoKeyInput";
import ResultsSection from "@/components/ResultsSection";
import StraicoUserInfo from '@/components/StraicoUserInfo';
import InterestAnalyzer from "@/components/interest-analyzer/InterestAnalyzer";
import HowItWorks from "@/components/interest-analyzer/HowItWorks";
import PageHeader from "@/components/interest-analyzer/PageHeader";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [isInterestSelectorCollapsed, setIsInterestSelectorCollapsed] = useState(false);
  const [useCases, setUseCases] = useState<Array<{
    title: string;
    description: string;
    steps: string[];
    audience: string;
    prompt: string;
    aiResponse?: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [straicoKey, setStraicoKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load Straico key from localStorage
    const savedStraicoKey = localStorage.getItem('straico_api_key');
    if (savedStraicoKey) setStraicoKey(savedStraicoKey);
  }, []);

  useEffect(() => {
    // Save Straico key to localStorage when it changes
    if (straicoKey) localStorage.setItem('straico_api_key', straicoKey);
  }, [straicoKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-white p-6">
      <div className="max-w-4xl mx-auto">
        <PageHeader />

        {straicoKey && (
          <div className="mb-8">
            <StraicoUserInfo straicoKey={straicoKey} />
          </div>
        )}

        <HowItWorks />

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-6 mb-8">
          <StraicoKeyInput straicoKey={straicoKey} setStraicoKey={setStraicoKey} />

          <InterestAnalyzer
            straicoKey={straicoKey}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setShowResults={setShowResults}
            setIsInterestSelectorCollapsed={setIsInterestSelectorCollapsed}
            setUseCases={setUseCases}
            isInterestSelectorCollapsed={isInterestSelectorCollapsed}
            toast={useToast()}
          />
        </div>

        <ResultsSection 
          showResults={showResults} 
          useCases={useCases} 
          straicoKey={straicoKey}
        />
      </div>
    </div>
  );
};

export default Index;