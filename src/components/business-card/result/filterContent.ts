export const filterContent = (content: string | null, activeSection: string): string => {
  if (!content) return '';

  // If showing all sections, return the complete content
  if (activeSection === 'all') {
    return content;
  }

  // Extract the relevant section based on activeSection
  const sections = {
    'product': ['Product Development', 'Technical Requirements', 'Development Timeline'],
    'market': ['Market Validation', 'Market Analysis', 'Target Market'],
    'monetization': ['Monetization', 'Revenue Streams', 'Financial Projections'],
    'operations': ['Operations', 'Business Operations', 'Operational Requirements'],
    'growth': ['Growth Strategy', 'Growth Path', 'Scaling Strategy']
  };

  const relevantKeywords = sections[activeSection as keyof typeof sections] || [];
  
  // Split content into sections and find matching ones
  const contentSections = content.split(/(?=\n[A-Z][^a-z\n:]+:)/);
  
  const matchingSections = contentSections.filter(section =>
    relevantKeywords.some(keyword => 
      section.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  return matchingSections.join('\n\n') || 'No specific information available for this section.';
};