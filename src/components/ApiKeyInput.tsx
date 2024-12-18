import React from "react";
import { Input } from "@/components/ui/input";

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, setApiKey }) => {
  return (
    <div className="mb-6">
      <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
        OpenAI API Key
      </label>
      <Input
        id="apiKey"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter your OpenAI API key"
        className="w-full"
      />
    </div>
  );
};

export default ApiKeyInput;