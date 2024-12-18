import React from "react";
import { Button } from "@/components/ui/button";

interface AnalysisButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const AnalysisButton: React.FC<AnalysisButtonProps> = ({ isLoading, disabled, onClick }) => {
  return (
    <div className="mt-8 text-center">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white px-8 py-2 shadow-md hover:shadow-lg transition-all duration-300"
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <span>Generating...</span>
            <span className="text-xs text-white/70 mt-1">This may take up to 30 seconds</span>
          </div>
        ) : (
          "Explore potential combinations"
        )}
      </Button>
    </div>
  );
};

export default AnalysisButton;