import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Interest } from "@/types/interests";

interface SelectedInterestsProps {
  selectedInterests: string[];
  interests: Interest[];
  onInterestSelect: (id: string) => void;
}

const SelectedInterests: React.FC<SelectedInterestsProps> = ({
  selectedInterests,
  interests,
  onInterestSelect,
}) => {
  if (selectedInterests.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg animate-fadeIn">
      {selectedInterests.map((id) => {
        const interest = interests.find((i) => i.id === id);
        if (!interest) return null;
        return (
          <Button
            key={interest.id}
            variant="default"
            className="bg-primary text-white flex items-center gap-1 group"
            onClick={() => onInterestSelect(interest.id)}
          >
            <span>{interest.icon}</span>
            <span>{interest.name}</span>
            <X className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        );
      })}
    </div>
  );
};

export default SelectedInterests;