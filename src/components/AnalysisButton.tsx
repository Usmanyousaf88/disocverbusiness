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
        {isLoading ? "Generating..." : "Explore potential combinations"}
      </Button>
    </div>
  );
};

export default AnalysisButton;