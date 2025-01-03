import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeepDiveButtonProps {
  isLoading: boolean;
  onAnalyze: () => Promise<void>;
}

const DeepDiveButton: React.FC<DeepDiveButtonProps> = ({ isLoading, onAnalyze }) => {
  return (
    <Button
      onClick={onAnalyze}
      disabled={isLoading}
      className="bg-primary hover:bg-primary-hover text-white transition-colors duration-300 flex items-center gap-2 text-lg px-6 py-6 rounded-xl w-full md:w-auto"
    >
      {isLoading ? (
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
  );
};

export default DeepDiveButton;