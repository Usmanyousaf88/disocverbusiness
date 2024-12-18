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
  { id: "9", name: "Dancing", icon: "💃" },
  { id: "10", name: "Gaming", icon: "🎮" },
  { id: "11", name: "Gardening", icon: "🌱" },
  { id: "12", name: "Baking", icon: "🥖" },
  { id: "13", name: "Yoga", icon: "🧘" },
  { id: "14", name: "Reading", icon: "📖" },
  { id: "15", name: "Painting", icon: "🖌️" },
  { id: "16", name: "Crafts", icon: "🎨" },
  { id: "17", name: "Languages", icon: "🗣️" },
  { id: "18", name: "Meditation", icon: "🧘‍♂️" },
  { id: "19", name: "Fashion", icon: "👗" },
  { id: "20", name: "DIY", icon: "🔨" },
  { id: "21", name: "Podcasting", icon: "🎙️" },
  { id: "22", name: "Blogging", icon: "📝" },
  { id: "23", name: "Videography", icon: "🎥" },
  { id: "24", name: "Animation", icon: "🎬" },
  { id: "25", name: "Voice Acting", icon: "🎭" },
  { id: "26", name: "Pet Training", icon: "🐕" },
  { id: "27", name: "Interior Design", icon: "🏠" },
  { id: "28", name: "Makeup", icon: "💄" },
  { id: "29", name: "Nutrition", icon: "🥗" },
  { id: "30", name: "Investing", icon: "📈" },
  { id: "31", name: "Public Speaking", icon: "🎤" },
  { id: "32", name: "Event Planning", icon: "📅" },
  { id: "33", name: "Woodworking", icon: "🪚" },
  { id: "34", name: "3D Printing", icon: "🖨️" },
  { id: "35", name: "Pottery", icon: "🏺" },
  { id: "36", name: "Jewelry Making", icon: "💍" },
  { id: "37", name: "Brewing", icon: "🍺" },
  { id: "38", name: "Wine Tasting", icon: "🍷" },
  { id: "39", name: "Astronomy", icon: "🔭" },
  { id: "40", name: "Chess", icon: "♟️" },
  { id: "41", name: "Magic Tricks", icon: "🎩" },
  { id: "42", name: "Martial Arts", icon: "🥋" },
  { id: "43", name: "Surfing", icon: "🏄" },
  { id: "44", name: "Rock Climbing", icon: "🧗" },
  { id: "45", name: "Hiking", icon: "🏃" },
  { id: "46", name: "Cycling", icon: "🚴" },
  { id: "47", name: "Skateboarding", icon: "🛹" },
  { id: "48", name: "Archery", icon: "🎯" },
  { id: "49", name: "Calligraphy", icon: "✒️" },
  { id: "50", name: "Origami", icon: "📄" },
  { id: "51", name: "Beekeeping", icon: "🐝" },
  { id: "52", name: "Soap Making", icon: "🧼" },
  { id: "53", name: "Candle Making", icon: "🕯️" },
  { id: "54", name: "Robotics", icon: "🤖" },
  { id: "55", name: "Astronomy", icon: "⭐" },
  { id: "56", name: "Bird Watching", icon: "🦅" },
  { id: "57", name: "Foraging", icon: "🍄" },
  { id: "58", name: "Travel Planning", icon: "✈️" },
  { id: "59", name: "Coaching", icon: "🏆" },
  { id: "60", name: "Consulting", icon: "💼" },
  { id: "61", name: "Mentoring", icon: "🤝" },
  { id: "62", name: "Storytelling", icon: "📖" },
  { id: "63", name: "Digital Marketing", icon: "📣" },
  { id: "64", name: "Community Building", icon: "🌐" }
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
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-1 animate-fadeIn">
      {predefinedInterests.map((interest) => (
        <Button
          key={interest.id}
          variant={selectedInterests.includes(interest.id) ? "default" : "outline"}
          className={`h-14 flex flex-col items-center justify-center gap-0.5 transition-all text-[0.6rem] ${
            selectedInterests.includes(interest.id)
              ? "bg-primary text-white"
              : "hover:border-primary hover:text-primary"
          }`}
          onClick={() => onInterestSelect(interest.id)}
        >
          <span className="text-base">{interest.icon}</span>
          <span className="truncate w-full px-0.5">{interest.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default InterestSelector;