import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mb-8 text-left animate-fadeIn">
      <h2 className="text-xl font-semibold text-primary mb-4">How It Works:</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">1</span>
          <p className="text-gray-700">Select at least 3 interests that excite you - these can be your hobbies, skills, or passions.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">2</span>
          <p className="text-gray-700">Our AI will analyze unique combinations of your interests to discover innovative business opportunities.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">3</span>
          <p className="text-gray-700">For each idea, you'll get detailed insights including potential business names, target audience, and step-by-step startup guide.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">4</span>
          <p className="text-gray-700">Use the "Dive Deeper" feature to get a complete business roadmap including first steps, potential clients, and marketing strategies.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;