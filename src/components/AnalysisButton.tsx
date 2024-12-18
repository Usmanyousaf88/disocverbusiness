import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface AnalysisButtonProps {
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

const AnalysisButton: React.FC<AnalysisButtonProps> = ({ isLoading, disabled, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8 text-center">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-white px-8 py-2 shadow-md hover:shadow-lg transition-all duration-300"
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <span>{t('generating')}</span>
            <span className="text-xs text-white/70 mt-1">{t('generatingDescription')}</span>
          </div>
        ) : (
          t('exploreButton')
        )}
      </Button>
    </div>
  );
};

export default AnalysisButton;