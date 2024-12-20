export const getIntroText = (sectionTitle: string): string => {
  const introTexts: Record<string, string> = {
    'Product Development': "Let's explore how we'll build your product...",
    'Market Validation': "Here's what we know about your potential customers...",
    'Monetization Strategy': "Now, let's talk about how you'll make money...",
    'Technical Infrastructure': "Here's the technology foundation you'll need...",
    'Go-to-Market Strategy': "Let's plan how to launch your product...",
    'Business Operations': "Here's how you'll run your business day-to-day...",
    'Legal and Compliance': "Important legal stuff to keep in mind...",
    'Financial Planning': "Let's talk about the money side of things...",
    'Growth Strategy': "Here's how we'll help your business grow...",
    'Success Metrics': "Here's how we'll measure your success..."
  };

  return introTexts[sectionTitle] || "Let's dive into the details...";
};