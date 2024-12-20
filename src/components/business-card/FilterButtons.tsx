import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Target, 
  ChartPieIcon,
  Users,
  BookOpen,
  TrendingUp,
  Wallet,
  Settings,
  Megaphone,
  Network
} from "lucide-react";

export type ResultSection = 
  | 'all'
  | 'product-development'
  | 'market-validation'
  | 'monetization'
  | 'technical'
  | 'go-to-market'
  | 'operations'
  | 'legal'
  | 'financial'
  | 'growth'
  | 'metrics';

export const filterButtons = [
  { id: 'all' as const, label: 'All Results', icon: Target },
  { id: 'product-development' as const, label: 'Product Development', icon: ChartPieIcon },
  { id: 'market-validation' as const, label: 'Market Validation', icon: Users },
  { id: 'monetization' as const, label: 'Monetization', icon: Wallet },
  { id: 'technical' as const, label: 'Technical', icon: Settings },
  { id: 'go-to-market' as const, label: 'Go-to-Market', icon: Megaphone },
  { id: 'operations' as const, label: 'Operations', icon: Network },
  { id: 'legal' as const, label: 'Legal', icon: BookOpen },
  { id: 'financial' as const, label: 'Financial', icon: TrendingUp },
  { id: 'growth' as const, label: 'Growth', icon: TrendingUp },
  { id: 'metrics' as const, label: 'Success Metrics', icon: Target }
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
