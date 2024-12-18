import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SelectedInterests from "./SelectedInterests";
import { categoryEmojis } from "@/constants/categoryEmojis";
import { Interest } from "@/types/interests";
import { creativeArtsInterests } from "@/data/interests/creativeArts";
import { technologyInterests } from "@/data/interests/technology";
import { foodAndCulinaryInterests } from "@/data/interests/foodAndCulinary";
import { healthAndWellnessInterests } from "@/data/interests/healthAndWellness";
import { educationInterests } from "@/data/interests/education";
import { performingArtsInterests } from "@/data/interests/performingArts";
import { entertainmentInterests } from "@/data/interests/entertainment";
import { lifestyleInterests } from "@/data/interests/lifestyle";
import { mediaInterests } from "@/data/interests/media";
import { craftsInterests } from "@/data/interests/crafts";
import { scienceInterests } from "@/data/interests/science";
import { gamesInterests } from "@/data/interests/games";
import { sportsInterests } from "@/data/interests/sports";
import { natureInterests } from "@/data/interests/nature";
import { financeInterests } from "@/data/interests/finance";
import { businessInterests } from "@/data/interests/business";

// Combine all interests
const predefinedInterests: Interest[] = [
  ...creativeArtsInterests,
  ...technologyInterests,
  ...foodAndCulinaryInterests,
  ...healthAndWellnessInterests,
  ...educationInterests,
  ...performingArtsInterests,
  ...entertainmentInterests,
  ...lifestyleInterests,
  ...mediaInterests,
  ...craftsInterests,
  ...scienceInterests,
  ...gamesInterests,
  ...sportsInterests,
  ...natureInterests,
  ...financeInterests,
  ...businessInterests,
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
      <SelectedInterests
        selectedInterests={selectedInterests}
        interests={predefinedInterests}
        onInterestSelect={onInterestSelect}
      />

      <Tabs defaultValue={categories[0]} className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-hover data-[state=active]:text-white transition-all duration-300"
            >
              <span className="mr-2">{categoryEmojis[category] || "📌"}</span>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
              {groupedInterests[category].map((interest) => (
                <Button
                  key={interest.id}
                  variant={selectedInterests.includes(interest.id) ? "default" : "outline"}
                  className={`h-auto min-h-[3.5rem] flex items-center justify-start px-3 gap-2 transition-all text-xs relative overflow-hidden group ${
                    selectedInterests.includes(interest.id)
                      ? "bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg"
                      : "hover:border-primary hover:text-primary bg-gradient-to-br from-white to-gray-50 hover:shadow-md"
                  }`}
                  onClick={() => onInterestSelect(interest.id)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-lg flex-shrink-0">{interest.icon}</span>
                  <span className="truncate font-medium text-left flex-1 whitespace-normal leading-tight">{interest.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

// Assign the static property
InterestSelector.predefinedInterests = predefinedInterests;

export default InterestSelector;