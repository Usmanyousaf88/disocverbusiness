import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StraicoKeyInputProps {
  straicoKey: string;
  setStraicoKey: (key: string) => void;
}

const StraicoKeyInput: React.FC<StraicoKeyInputProps> = ({ straicoKey, setStraicoKey }) => {
  return (
    <div className="mb-6">
      <Label htmlFor="straicoKey" className="text-sm font-medium text-gray-700 mb-2">
        Straico API Key
      </Label>
      <Input
        id="straicoKey"
        type="password"
        value={straicoKey}
        onChange={(e) => setStraicoKey(e.target.value)}
        placeholder="Enter your Straico API key"
        className="w-full"
      />
      <p className="mt-2 text-sm text-gray-500">
        Your API key will be stored securely in your browser's local storage.
      </p>
    </div>
  );
};

export default StraicoKeyInput;