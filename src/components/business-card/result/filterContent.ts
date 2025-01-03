import { ResultSection } from '../FilterButtons';

export const filterContent = (content: string, activeSection: ResultSection): { [key: string]: string } => {
  // Split content into sections based on common headers
  const sections = content.split(/(?=Product Development:|Market Validation:|Monetization:|Operations:|Growth:)/g)
    .filter(section => section.trim());

  // Create an object to store our sections
  const contentSections: { [key: string]: string } = {};

  sections.forEach(section => {
    const [title, ...content] = section.split('\n');
    const cleanTitle = title.replace(':', '').trim().toLowerCase()
      .replace(/\s+/g, ''); // Convert "Product Development" to "productDevelopment"
    
    contentSections[cleanTitle] = content.join('\n').trim();
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
