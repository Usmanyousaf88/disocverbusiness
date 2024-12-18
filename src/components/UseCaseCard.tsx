import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UseCaseProps {
  title: string;
  description: string;
  steps: string[];
  audience: string;
}

const UseCaseCard: React.FC<UseCaseProps> = ({
  title,
  description,
  steps,
  audience,
}) => {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Steps to Get Started:</h4>
          <ul className="list-disc list-inside space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="text-gray-600">
                {step}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Target Audience:</span> {audience}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseCard;