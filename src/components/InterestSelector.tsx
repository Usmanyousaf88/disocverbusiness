import React from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";

interface Interest {
  id: string;
  name: string;
  icon: string;
  category: string;
}

const predefinedInterests: Interest[] = [
  { id: "1", name: "Writing", icon: "✍️", category: "Creative Arts" },
  { id: "2", name: "Cooking", icon: "🍳", category: "Food & Culinary" },
  { id: "3", name: "Fitness", icon: "💪", category: "Health & Wellness" },
  { id: "4", name: "Art", icon: "🎨", category: "Creative Arts" },
  { id: "5", name: "Music", icon: "🎵", category: "Creative Arts" },
  { id: "6", name: "Technology", icon: "💻", category: "Technology" },
  { id: "7", name: "Teaching", icon: "📚", category: "Education" },
  { id: "8", name: "Photography", icon: "📷", category: "Creative Arts" },
  { id: "9", name: "Dancing", icon: "💃", category: "Performing Arts" },
  { id: "10", name: "Gaming", icon: "🎮", category: "Entertainment" },
  { id: "11", name: "Gardening", icon: "🌱", category: "Lifestyle" },
  { id: "12", name: "Baking", icon: "🥖", category: "Food & Culinary" },
  { id: "13", name: "Yoga", icon: "🧘", category: "Health & Wellness" },
  { id: "14", name: "Reading", icon: "📖", category: "Education" },
  { id: "15", name: "Painting", icon: "🖌️", category: "Creative Arts" },
  { id: "16", name: "Crafts", icon: "🎨", category: "Creative Arts" },
  { id: "17", name: "Languages", icon: "🗣️", category: "Education" },
  { id: "18", name: "Meditation", icon: "🧘‍♂️", category: "Health & Wellness" },
  { id: "19", name: "Fashion", icon: "👗", category: "Lifestyle" },
  { id: "20", name: "DIY", icon: "🔨", category: "Lifestyle" },
  { id: "21", name: "Podcasting", icon: "🎙️", category: "Media" },
  { id: "22", name: "Blogging", icon: "📝", category: "Media" },
  { id: "23", name: "Videography", icon: "🎥", category: "Media" },
  { id: "24", name: "Animation", icon: "🎬", category: "Media" },
  { id: "25", name: "Voice Acting", icon: "🎭", category: "Performing Arts" },
  { id: "26", name: "Pet Training", icon: "🐕", category: "Lifestyle" },
  { id: "27", name: "Interior Design", icon: "🏠", category: "Lifestyle" },
  { id: "28", name: "Makeup", icon: "💄", category: "Lifestyle" },
  { id: "29", name: "Nutrition", icon: "🥗", category: "Health & Wellness" },
  { id: "30", name: "Investing", icon: "📈", category: "Finance" },
  { id: "31", name: "Public Speaking", icon: "🎤", category: "Education" },
  { id: "32", name: "Event Planning", icon: "📅", category: "Lifestyle" },
  { id: "33", name: "Woodworking", icon: "🪚", category: "Crafts" },
  { id: "34", name: "3D Printing", icon: "🖨️", category: "Technology" },
  { id: "35", name: "Pottery", icon: "🏺", category: "Crafts" },
  { id: "36", name: "Jewelry Making", icon: "💍", category: "Crafts" },
  { id: "37", name: "Brewing", icon: "🍺", category: "Food & Culinary" },
  { id: "38", name: "Wine Tasting", icon: "🍷", category: "Food & Culinary" },
  { id: "39", name: "Astronomy", icon: "🔭", category: "Science" },
  { id: "40", name: "Chess", icon: "♟️", category: "Games" },
  { id: "41", name: "Magic Tricks", icon: "🎩", category: "Performing Arts" },
  { id: "42", name: "Martial Arts", icon: "🥋", category: "Health & Wellness" },
  { id: "43", name: "Surfing", icon: "🏄", category: "Sports" },
  { id: "44", name: "Rock Climbing", icon: "🧗", category: "Sports" },
  { id: "45", name: "Hiking", icon: "🏃", category: "Sports" },
  { id: "46", name: "Cycling", icon: "🚴", category: "Sports" },
  { id: "47", name: "Skateboarding", icon: "🛹", category: "Sports" },
  { id: "48", name: "Archery", icon: "🎯", category: "Sports" },
  { id: "49", name: "Calligraphy", icon: "✒️", category: "Creative Arts" },
  { id: "50", name: "Origami", icon: "📄", category: "Creative Arts" },
  { id: "51", name: "Beekeeping", icon: "🐝", category: "Lifestyle" },
  { id: "52", name: "Soap Making", icon: "🧼", category: "Crafts" },
  { id: "53", name: "Candle Making", icon: "🕯️", category: "Crafts" },
  { id: "54", name: "Robotics", icon: "🤖", category: "Technology" },
  { id: "55", name: "Astronomy", icon: "⭐", category: "Science" },
  { id: "56", name: "Bird Watching", icon: "🦅", category: "Nature" },
  { id: "57", name: "Foraging", icon: "🍄", category: "Nature" },
  { id: "58", name: "Travel Planning", icon: "✈️", category: "Lifestyle" },
  { id: "59", name: "Coaching", icon: "🏆", category: "Education" },
  { id: "60", name: "Consulting", icon: "💼", category: "Business" },
  { id: "61", name: "Mentoring", icon: "🤝", category: "Education" },
  { id: "62", name: "Storytelling", icon: "📖", category: "Creative Arts" },
  { id: "63", name: "Digital Marketing", icon: "📣", category: "Business" },
  { id: "64", name: "Community Building", icon: "🌐", category: "Social" },
  { id: "65", name: "Soap Making", icon: "🧼", category: "Crafts" },
  { id: "66", name: "Candle Making", icon: "🕯️", category: "Crafts" },
  { id: "67", name: "Robotics", icon: "🤖", category: "Technology" },
  { id: "68", name: "Astronomy", icon: "⭐", category: "Science" },
  { id: "69", name: "Bird Watching", icon: "🦅", category: "Nature" },
  { id: "70", name: "Foraging", icon: "🍄", category: "Nature" },
  { id: "71", name: "Travel Planning", icon: "✈️", category: "Lifestyle" },
  { id: "72", name: "Web Design", icon: "🎨", category: "Technology" },
  { id: "73", name: "Social Media", icon: "📱", category: "Media" },
  { id: "74", name: "Car Mechanics", icon: "🔧", category: "Skills" },
  { id: "75", name: "Home Staging", icon: "🏡", category: "Lifestyle" },
  { id: "76", name: "Life Coaching", icon: "🎯", category: "Education" },
  { id: "77", name: "Resume Writing", icon: "📝", category: "Education" },
  { id: "78", name: "Virtual Assistant", icon: "💼", category: "Business" },
  { id: "79", name: "Data Analysis", icon: "📊", category: "Business" },
  { id: "80", name: "Graphic Design", icon: "🖌️", category: "Creative Arts" },
  { id: "81", name: "UI/UX Design", icon: "🎨", category: "Technology" },
  { id: "82", name: "App Development", icon: "📱", category: "Technology" },
  { id: "83", name: "Copywriting", icon: "✍️", category: "Media" },
  { id: "84", name: "Email Marketing", icon: "📧", category: "Business" },
  { id: "85", name: "SEO", icon: "🔍", category: "Business" },
  { id: "86", name: "Video Editing", icon: "🎬", category: "Media" },
  { id: "87", name: "Sound Design", icon: "🎵", category: "Media" },
  { id: "88", name: "3D Modeling", icon: "💻", category: "Technology" },
  { id: "89", name: "Game Design", icon: "🎮", category: "Games" },
  { id: "90", name: "Illustration", icon: "🖼️", category: "Creative Arts" },
  { id: "91", name: "Comic Art", icon: "📚", category: "Creative Arts" },
  { id: "92", name: "Sticker Design", icon: "🏷️", category: "Creative Arts" },
  { id: "93", name: "Print Design", icon: "🖨️", category: "Creative Arts" },
  { id: "94", name: "Book Design", icon: "📖", category: "Creative Arts" },
  { id: "95", name: "Logo Design", icon: "✒️", category: "Creative Arts" },
  { id: "96", name: "Brand Strategy", icon: "🎯", category: "Business" },
  { id: "97", name: "Content Strategy", icon: "📋", category: "Business" },
  { id: "98", name: "Product Design", icon: "⚡", category: "Technology" },
  { id: "99", name: "UX Research", icon: "🔬", category: "Technology" },
  { id: "100", name: "Motion Design", icon: "🎥", category: "Media" },
  { id: "101", name: "Color Theory", icon: "🎨", category: "Creative Arts" },
  { id: "102", name: "Typography", icon: "📝", category: "Creative Arts" },
  { id: "103", name: "Icon Design", icon: "🎯", category: "Creative Arts" },
  { id: "104", name: "Pattern Design", icon: "🔄", category: "Creative Arts" },
  { id: "105", name: "Textile Design", icon: "🧵", category: "Creative Arts" },
  { id: "106", name: "Fashion Design", icon: "👗", category: "Creative Arts" },
  { id: "107", name: "Costume Design", icon: "🎭", category: "Creative Arts" },
  { id: "108", name: "Set Design", icon: "🎬", category: "Creative Arts" },
  { id: "109", name: "Prop Making", icon: "🎪", category: "Creative Arts" },
  { id: "110", name: "Puppet Making", icon: "🎭", category: "Creative Arts" },
  { id: "111", name: "Mask Making", icon: "😷", category: "Creative Arts" },
  { id: "112", name: "Special Effects", icon: "✨", category: "Creative Arts" }
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestSelect: (id: string) => void;
}

type InterestSelectorType = React.FC<InterestSelectorProps> & {
  predefinedInterests: Interest[];
};

const InterestSelector: InterestSelectorType = ({
  selectedInterests,
  onInterestSelect,
}) => {
  // Group interests by category
  const groupedInterests = predefinedInterests.reduce((acc, interest) => {
    if (!acc[interest.category]) {
      acc[interest.category] = [];
    }
    acc[interest.category].push(interest);
    return acc;
  }, {} as Record<string, Interest[]>);

  const categories = Object.keys(groupedInterests).sort();

  return (
    <div className="space-y-4">
      {/* Selected Interests */}
      {selectedInterests.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg animate-fadeIn">
          {selectedInterests.map((id) => {
            const interest = predefinedInterests.find((i) => i.id === id);
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
      )}

      {/* Categorized Interests */}
      <Accordion type="multiple" className="w-full">
        {categories.map((category) => (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger className="text-lg font-medium">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-1 pt-2">
                {groupedInterests[category].map((interest) => (
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

// Assign the static property
InterestSelector.predefinedInterests = predefinedInterests;

export default InterestSelector;
