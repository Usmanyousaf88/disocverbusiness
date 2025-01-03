import React from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface AnalysisProgressProps {
  stage: "generating" | "analyzing" | "complete";
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ stage }) => {
  const getProgress = () => {
    switch (stage) {
      case "generating":
        return 33;
      case "analyzing":
        return 66;
      case "complete":
        return 100;
      default:
        return 0;
    }
  };

  const getMessage = () => {
    switch (stage) {
      case "generating":
        return "Generating innovative business ideas...";
      case "analyzing":
        return "Analyzing market potential and opportunities...";
      case "complete":
        return "Analysis complete!";
      default:
        return "Preparing analysis...";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4 animate-fadeIn">
      <div className="flex items-center gap-3 text-primary">
        <Loader2 className={`w-5 h-5 ${stage !== "complete" ? "animate-spin" : ""}`} />
        <span className="font-medium">{getMessage()}</span>
      </div>
      <Progress value={getProgress()} className="h-2" />
      <p className="text-sm text-muted-foreground text-center">
        {stage === "complete" ? "Ready to explore your business ideas!" : "Please wait while we process your request..."}
      </p>
    </div>
  );
};

export default AnalysisProgress;