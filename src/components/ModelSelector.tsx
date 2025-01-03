import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ModelSelectorProps {
  selectedModels: string[];
  onModelsSelect: (models: string[]) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModels, onModelsSelect }) => {
  const models = [
    { id: "anthropic/claude-3-haiku:beta", name: "Claude 3 Haiku" },
    { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet" },
    { id: "openai/gpt-3.5-turbo-0125", name: "GPT-3.5 Turbo" },
  ];

  const handleModelToggle = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      onModelsSelect(selectedModels.filter(id => id !== modelId));
    } else {
      onModelsSelect([...selectedModels, modelId]);
    }
  };

  return (
    <div className="space-y-4">
      {models.map((model) => (
        <div key={model.id} className="flex items-center space-x-2">
          <Checkbox
            id={model.id}
            checked={selectedModels.includes(model.id)}
            onCheckedChange={() => handleModelToggle(model.id)}
          />
          <Label htmlFor={model.id}>{model.name}</Label>
        </div>
      ))}
    </div>
  );
};

export default ModelSelector;