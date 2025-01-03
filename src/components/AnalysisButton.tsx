import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AnalysisButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
  selectedModel?: string;
}

const AnalysisButton: React.FC<AnalysisButtonProps> = ({ 
  isLoading, 
  disabled, 
  onClick,
  selectedModel 
}) => {
  const { toast } = useToast();

  const handleClick = async () => {
    if (!selectedModel) {
      toast({
        title: "No Model Selected",
        description: "Please select an AI model before generating ideas",
        variant: "destructive",
      });
      return;
    }

    // Reset any previous results
    onClick();
  };

  return (
    <div className="relative mt-8 text-center">
      <Button
        onClick={handleClick}
        disabled={disabled || !selectedModel}
        className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white px-8 py-2 shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto min-w-[200px] cursor-pointer"
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <span>Generating with {selectedModel?.split('/')[1]}...</span>
            <span className="text-xs text-white/70 mt-1">This may take up to 30 seconds</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span>Explore potential combinations</span>
            {selectedModel && (
              <span className="text-xs text-white/70 mt-1">
                Using {selectedModel.split('/')[1]}
              </span>
            )}
          </div>
        )}
      </Button>
    </div>
  );
};

export default AnalysisButton;