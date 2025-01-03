import { ResultSection } from '../FilterButtons';

export const filterContent = (content: string, activeSection: ResultSection): { [key: string]: string } => {
  // Create an object to store our sections
  const contentSections: { [key: string]: string } = {};
  
  // Define section headers we're looking for
  const sectionHeaders = {
    productDevelopment: 'Product Development:',
    marketValidation: 'Market Validation:',
    monetization: 'Monetization:',
    operations: 'Operations:',
    growth: 'Growth:'
  };

  // Split content into sections
  Object.entries(sectionHeaders).forEach(([key, header]) => {
    const sectionRegex = new RegExp(`${header}([\\s\\S]*?)(?=${Object.values(sectionHeaders).join('|')}|$)`);
    const match = content.match(sectionRegex);
    if (match && match[1]) {
      contentSections[key] = match[1].trim();
    }
  });

  // If activeSection is 'all', return all sections
  if (activeSection === 'all') {
    return contentSections;
  }

  // Otherwise, return only the requested section
  const filteredContent: { [key: string]: string } = {};
  if (contentSections[activeSection]) {
    filteredContent[activeSection] = contentSections[activeSection];
  }

  return filteredContent;
};