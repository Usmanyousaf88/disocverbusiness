import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

interface ModelInfo {
  name: string;
  model: string;
  word_limit: number;
  pricing: {
    coins: number;
    words: number;
  };
  max_output: number;
}

interface ModelSelectorProps {
  selectedModels: string[];
  onModelsSelect: (models: string[]) => void;
  straicoKey: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModels, onModelsSelect, straicoKey }) => {
  const { toast } = useToast();

  const { data: modelsData, isLoading, error } = useQuery({
    queryKey: ['models', straicoKey],
    queryFn: async () => {
      console.log('Fetching models from Straico API');
      const response = await fetch('https://api.straico.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${straicoKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }
      
      const data = await response.json();
      console.log('Models fetched successfully:', data);
      return data.data;
    },
    enabled: !!straicoKey,
  });

  const handleModelToggle = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      onModelsSelect(selectedModels.filter(id => id !== modelId));
    } else {
      onModelsSelect([...selectedModels, modelId]);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading available models...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading models. Please check your API key.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modelsData?.chat.map((model: ModelInfo) => (
        <Card key={model.model} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start space-x-3">
            <Checkbox
              id={model.model}
              checked={selectedModels.includes(model.model)}
              onCheckedChange={() => handleModelToggle(model.model)}
            />
            <div className="space-y-2">
              <Label htmlFor={model.model} className="font-medium cursor-pointer">
                {model.name}
              </Label>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Word limit: {model.word_limit.toLocaleString()}</p>
                <p>Price: {model.pricing.coins} coins per {model.pricing.words} words</p>
                <p>Max output: {model.max_output.toLocaleString()} tokens</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ModelSelector;