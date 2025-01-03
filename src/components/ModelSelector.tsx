import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info } from "lucide-react";

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

  const handleModelSelect = (modelId: string) => {
    onModelsSelect([modelId]); // Only allow one model selection
    
    const selectedModel = modelsData?.chat.find((m: ModelInfo) => m.model === modelId);
    if (selectedModel) {
      toast({
        title: "Model Selected",
        description: `All API calls will now use ${selectedModel.name}. Cost: ${selectedModel.pricing.coins} coins per ${selectedModel.pricing.words} words.`,
      });
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading available models...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading models. Please check your API key.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Select AI Model</h3>
        <Info className="h-4 w-4 text-gray-500" />
      </div>
      
      <Select
        value={selectedModels[0] || ""}
        onValueChange={handleModelSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an AI model" />
        </SelectTrigger>
        <SelectContent>
          {modelsData?.chat.map((model: ModelInfo) => (
            <SelectItem 
              key={model.model} 
              value={model.model}
              className="cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-gray-500">
                  {model.pricing.coins} coins/{model.pricing.words} words
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedModels[0] && (
        <div className="text-sm text-gray-500">
          Selected model will be used for all API calls
        </div>
      )}
    </div>
  );
};

export default ModelSelector;