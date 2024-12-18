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
  { id: "64", name: "Community Building", icon: "🌐" },
  { id: "65", name: "Soap Making", icon: "🧼" },
  { id: "66", name: "Candle Making", icon: "🕯️" },
  { id: "67", name: "Robotics", icon: "🤖" },
  { id: "68", name: "Astronomy", icon: "⭐" },
  { id: "69", name: "Bird Watching", icon: "🦅" },
  { id: "70", name: "Foraging", icon: "🍄" },
  { id: "71", name: "Travel Planning", icon: "✈️" },
  { id: "72", name: "Web Design", icon: "🎨" },
  { id: "73", name: "Social Media", icon: "📱" },
  { id: "74", name: "Car Mechanics", icon: "🔧" },
  { id: "75", name: "Home Staging", icon: "🏡" },
  { id: "76", name: "Life Coaching", icon: "🎯" },
  { id: "77", name: "Resume Writing", icon: "📝" },
  { id: "78", name: "Virtual Assistant", icon: "💼" },
  { id: "79", name: "Data Analysis", icon: "📊" },
  { id: "80", name: "Graphic Design", icon: "🖌️" },
  { id: "81", name: "UI/UX Design", icon: "🎨" },
  { id: "82", name: "App Development", icon: "📱" },
  { id: "83", name: "Copywriting", icon: "✍️" },
  { id: "84", name: "Email Marketing", icon: "📧" },
  { id: "85", name: "SEO", icon: "🔍" },
  { id: "86", name: "Video Editing", icon: "🎬" },
  { id: "87", name: "Sound Design", icon: "🎵" },
  { id: "88", name: "3D Modeling", icon: "💻" },
  { id: "89", name: "Game Design", icon: "🎮" },
  { id: "90", name: "Illustration", icon: "🖼️" },
  { id: "91", name: "Comic Art", icon: "📚" },
  { id: "92", name: "Sticker Design", icon: "🏷️" },
  { id: "93", name: "Print Design", icon: "🖨️" },
  { id: "94", name: "Book Design", icon: "📖" },
  { id: "95", name: "Logo Design", icon: "✒️" },
  { id: "96", name: "Brand Strategy", icon: "🎯" },
  { id: "97", name: "Content Strategy", icon: "📋" },
  { id: "98", name: "Product Design", icon: "⚡" },
  { id: "99", name: "UX Research", icon: "🔬" },
  { id: "100", name: "Motion Design", icon: "🎥" },
  { id: "101", name: "Color Theory", icon: "🎨" },
  { id: "102", name: "Typography", icon: "📝" },
  { id: "103", name: "Icon Design", icon: "🎯" },
  { id: "104", name: "Pattern Design", icon: "🔄" },
  { id: "105", name: "Textile Design", icon: "🧵" },
  { id: "106", name: "Fashion Design", icon: "👗" },
  { id: "107", name: "Costume Design", icon: "🎭" },
  { id: "108", name: "Set Design", icon: "🎬" },
  { id: "109", name: "Prop Making", icon: "🎪" },
  { id: "110", name: "Puppet Making", icon: "🎭" },
  { id: "111", name: "Mask Making", icon: "😷" },
  { id: "112", name: "Special Effects", icon: "✨" }
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestSelect: (id: string) => void;
}

// Create a type that extends the functional component with a static property
type InterestSelectorType = React.FC<InterestSelectorProps> & {
  predefinedInterests: Interest[];
};

const InterestSelector: InterestSelectorType = ({
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

// Assign the static property
InterestSelector.predefinedInterests = predefinedInterests;

export default InterestSelector;