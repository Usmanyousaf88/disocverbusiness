import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Target, 
  ChartPieIcon,
  Users,
  BookOpen,
  TrendingUp,
  Wallet,
  Calendar,
  Megaphone,
  AlertTriangle,
  Network,
  GraduationCap
} from "lucide-react";

export type ResultSection = 
  | 'all'
  | 'business-model'
  | 'success-stories'
  | 'resources'
  | 'market'
  | 'financial'
  | 'timeline'
  | 'marketing'
  | 'risks'
  | 'networking'
  | 'learning';

interface FilterButtonsProps {
  activeSection: ResultSection;
  setActiveSection: (section: ResultSection) => void;
}

export const filterButtons = [
  { id: 'all' as const, label: 'All Results', icon: Target },
  { id: 'business-model' as const, label: 'Business Model', icon: ChartPieIcon },
  { id: 'success-stories' as const, label: 'Success Stories', icon: Users },
  { id: 'resources' as const, label: 'Resources', icon: BookOpen },
  { id: 'market' as const, label: 'Market Analysis', icon: TrendingUp },
  { id: 'financial' as const, label: 'Financial', icon: Wallet },
  { id: 'timeline' as const, label: 'Timeline', icon: Calendar },
  { id: 'marketing' as const, label: 'Marketing', icon: Megaphone },
  { id: 'risks' as const, label: 'Risks', icon: AlertTriangle },
  { id: 'networking' as const, label: 'Networking', icon: Network },
  { id: 'learning' as const, label: 'Learning', icon: GraduationCap }
];

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeSection, setActiveSection }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filterButtons.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          onClick={() => setActiveSection(id)}
          variant={activeSection === id ? "default" : "outline"}
          className="flex items-center gap-2"
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;