import React from "react";
import { Button } from "@/components/ui/button";

interface Interest {
  id: string;
  name: string;
  icon: string;
}

const predefinedInterests: Interest[] = [
  { id: "1", name: "Writing", icon: "✍️" },
  { id: "2", name: "Cooking", icon: "🍳" },
  { id: "3", name: "Fitness", icon: "💪" },
  { id: "4", name: "Art", icon: "🎨" },
  { id: "5", name: "Music", icon: "🎵" },
  { id: "6", name: "Technology", icon: "💻" },
  { id: "7", name: "Teaching", icon: "📚" },
  { id: "8", name: "Photography", icon: "📷" },
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestSelect: (id: string) => void;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({
  selectedInterests,
  onInterestSelect,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
      {predefinedInterests.map((interest) => (
        <Button
          key={interest.id}
          variant={selectedInterests.includes(interest.id) ? "default" : "outline"}
          className={`h-24 flex flex-col items-center justify-center gap-2 transition-all ${
            selectedInterests.includes(interest.id)
              ? "bg-primary text-white"
              : "hover:border-primary hover:text-primary"
          }`}
          onClick={() => onInterestSelect(interest.id)}
        >
          <span className="text-2xl">{interest.icon}</span>
          <span>{interest.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default InterestSelector;