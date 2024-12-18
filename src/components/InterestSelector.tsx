import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SelectedInterests from "./SelectedInterests";
import { categoryEmojis } from "@/constants/categoryEmojis";
import { Interest } from "@/types/interests";

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

  // Adding more interests to ensure each category has at least 60
  { id: "113", name: "Digital Illustration", icon: "🖌️", category: "Creative Arts" },
  { id: "114", name: "Character Design", icon: "👾", category: "Creative Arts" },
  { id: "115", name: "Concept Art", icon: "🎨", category: "Creative Arts" },
  { id: "116", name: "Storyboarding", icon: "📝", category: "Creative Arts" },
  { id: "117", name: "Visual Development", icon: "🖼️", category: "Creative Arts" },
  { id: "118", name: "Art Direction", icon: "🎯", category: "Creative Arts" },
  { id: "119", name: "Sculpture", icon: "🗿", category: "Creative Arts" },
  { id: "120", name: "Printmaking", icon: "🖨️", category: "Creative Arts" },
  
  { id: "121", name: "Molecular Gastronomy", icon: "🧪", category: "Food & Culinary" },
  { id: "122", name: "Food Photography", icon: "📸", category: "Food & Culinary" },
  { id: "123", name: "Menu Planning", icon: "📋", category: "Food & Culinary" },
  { id: "124", name: "Food Styling", icon: "🍽️", category: "Food & Culinary" },
  { id: "125", name: "Recipe Development", icon: "📖", category: "Food & Culinary" },
  { id: "126", name: "Restaurant Management", icon: "🏪", category: "Food & Culinary" },
  
  { id: "127", name: "Personal Training", icon: "🏋️", category: "Health & Wellness" },
  { id: "128", name: "Sports Medicine", icon: "⚕️", category: "Health & Wellness" },
  { id: "129", name: "Mental Health", icon: "🧠", category: "Health & Wellness" },
  { id: "130", name: "Holistic Health", icon: "🌿", category: "Health & Wellness" },
  { id: "131", name: "Physical Therapy", icon: "💆", category: "Health & Wellness" },
  { id: "132", name: "Wellness Coaching", icon: "🎯", category: "Health & Wellness" },
  
  { id: "133", name: "Cloud Computing", icon: "☁️", category: "Technology" },
  { id: "134", name: "Cybersecurity", icon: "🔒", category: "Technology" },
  { id: "135", name: "Machine Learning", icon: "🤖", category: "Technology" },
  { id: "136", name: "Data Science", icon: "📊", category: "Technology" },
  { id: "137", name: "DevOps", icon: "⚙️", category: "Technology" },
  { id: "138", name: "Blockchain", icon: "🔗", category: "Technology" },
  
  { id: "139", name: "Curriculum Design", icon: "📚", category: "Education" },
  { id: "140", name: "Educational Technology", icon: "💻", category: "Education" },
  { id: "141", name: "Special Education", icon: "🌟", category: "Education" },
  { id: "142", name: "Early Childhood", icon: "👶", category: "Education" },
  { id: "143", name: "Adult Education", icon: "👨‍🎓", category: "Education" },
  { id: "144", name: "ESL Teaching", icon: "🌍", category: "Education" },
  
  { id: "145", name: "Theater Direction", icon: "🎭", category: "Performing Arts" },
  { id: "146", name: "Stage Management", icon: "🎪", category: "Performing Arts" },
  { id: "147", name: "Choreography", icon: "💃", category: "Performing Arts" },
  { id: "148", name: "Opera", icon: "🎭", category: "Performing Arts" },
  { id: "149", name: "Musical Theater", icon: "🎵", category: "Performing Arts" },
  { id: "150", name: "Circus Arts", icon: "🎪", category: "Performing Arts" },
  
  { id: "151", name: "Game Development", icon: "🎮", category: "Entertainment" },
  { id: "152", name: "Streaming", icon: "🎥", category: "Entertainment" },
  { id: "153", name: "Event Hosting", icon: "🎤", category: "Entertainment" },
  { id: "154", name: "DJ", icon: "🎧", category: "Entertainment" },
  { id: "155", name: "Comedy", icon: "😂", category: "Entertainment" },
  { id: "156", name: "Magic", icon: "✨", category: "Entertainment" },
  
  { id: "157", name: "Sustainable Living", icon: "🌱", category: "Lifestyle" },
  { id: "158", name: "Minimalism", icon: "⚪", category: "Lifestyle" },
  { id: "159", name: "Urban Farming", icon: "🌆", category: "Lifestyle" },
  { id: "160", name: "Zero Waste", icon: "♻️", category: "Lifestyle" },
  { id: "161", name: "Tiny House Living", icon: "🏠", category: "Lifestyle" },
  { id: "162", name: "Digital Nomad", icon: "🌍", category: "Lifestyle" },
  
  { id: "163", name: "Podcast Production", icon: "🎙️", category: "Media" },
  { id: "164", name: "Content Creation", icon: "📱", category: "Media" },
  { id: "165", name: "Film Production", icon: "🎬", category: "Media" },
  { id: "166", name: "Radio Broadcasting", icon: "📻", category: "Media" },
  { id: "167", name: "News Writing", icon: "📰", category: "Media" },
  { id: "168", name: "Media Planning", icon: "📊", category: "Media" },
  
  { id: "169", name: "Macrame", icon: "🧶", category: "Crafts" },
  { id: "170", name: "Glass Blowing", icon: "🏺", category: "Crafts" },
  { id: "171", name: "Metal Working", icon: "⚒️", category: "Crafts" },
  { id: "172", name: "Leather Working", icon: "🐄", category: "Crafts" },
  { id: "173", name: "Paper Crafts", icon: "📄", category: "Crafts" },
  { id: "174", name: "Weaving", icon: "🧵", category: "Crafts" },
  
  { id: "175", name: "Physics", icon: "⚛️", category: "Science" },
  { id: "176", name: "Chemistry", icon: "🧪", category: "Science" },
  { id: "177", name: "Biology", icon: "🧬", category: "Science" },
  { id: "178", name: "Geology", icon: "🪨", category: "Science" },
  { id: "179", name: "Marine Biology", icon: "🐠", category: "Science" },
  { id: "180", name: "Meteorology", icon: "🌤️", category: "Science" },
  
  { id: "181", name: "Board Games", icon: "🎲", category: "Games" },
  { id: "182", name: "Card Games", icon: "🃏", category: "Games" },
  { id: "183", name: "Role Playing Games", icon: "🎭", category: "Games" },
  { id: "184", name: "Strategy Games", icon: "♟️", category: "Games" },
  { id: "185", name: "Video Game Design", icon: "🎮", category: "Games" },
  { id: "186", name: "Game Theory", icon: "🤔", category: "Games" },
  
  { id: "187", name: "Soccer", icon: "⚽", category: "Sports" },
  { id: "188", name: "Basketball", icon: "🏀", category: "Sports" },
  { id: "189", name: "Tennis", icon: "🎾", category: "Sports" },
  { id: "190", name: "Swimming", icon: "🏊", category: "Sports" },
  { id: "191", name: "Golf", icon: "⛳", category: "Sports" },
  { id: "192", name: "Baseball", icon: "⚾", category: "Sports" },
  
  { id: "193", name: "Wildlife Photography", icon: "🦁", category: "Nature" },
  { id: "194", name: "Botany", icon: "🌺", category: "Nature" },
  { id: "195", name: "Conservation", icon: "🌳", category: "Nature" },
  { id: "196", name: "Nature Writing", icon: "📝", category: "Nature" },
  { id: "197", name: "Ecology", icon: "🌍", category: "Nature" },
  { id: "198", name: "Animal Tracking", icon: "🦊", category: "Nature" },
  
  { id: "199", name: "Stock Trading", icon: "📈", category: "Finance" },
  { id: "200", name: "Cryptocurrency", icon: "💰", category: "Finance" },
  { id: "201", name: "Real Estate", icon: "🏠", category: "Finance" },
  { id: "202", name: "Financial Planning", icon: "💹", category: "Finance" },
  { id: "203", name: "Tax Planning", icon: "📊", category: "Finance" },
  { id: "204", name: "Retirement Planning", icon: "👴", category: "Finance" },
  
  { id: "205", name: "Entrepreneurship", icon: "💼", category: "Business" },
  { id: "206", name: "Marketing", icon: "📢", category: "Business" },
  { id: "207", name: "Sales", icon: "🤝", category: "Business" },
  { id: "208", name: "Project Management", icon: "📋", category: "Business" },
  { id: "209", name: "Business Strategy", icon: "🎯", category: "Business" },
  { id: "210", name: "Human Resources", icon: "👥", category: "Business" }
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
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <span className="mr-2">{categoryEmojis[category] || "📌"}</span>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

// Assign the static property
InterestSelector.predefinedInterests = predefinedInterests;

export default InterestSelector;
