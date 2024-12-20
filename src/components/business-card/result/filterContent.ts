import { type ResultSection } from '../FilterButtons';

export const filterContent = (content: string | null, section: ResultSection): string => {
  if (!content) return '';
  
  const sections: Record<ResultSection, string> = {
    'all': content,
    'product-development': content.split('Market Validation:')[0],
    'market-validation': content.split('Market Validation:')[1]?.split('Monetization Strategy:')[0] || '',
    'monetization': content.split('Monetization Strategy:')[1]?.split('Technical Infrastructure:')[0] || '',
    'technical': content.split('Technical Infrastructure:')[1]?.split('Go-to-Market Strategy:')[0] || '',
    'go-to-market': content.split('Go-to-Market Strategy:')[1]?.split('Business Operations:')[0] || '',
    'operations': content.split('Business Operations:')[1]?.split('Legal and Compliance:')[0] || '',
    'legal': content.split('Legal and Compliance:')[1]?.split('Financial Planning:')[0] || '',
    'financial': content.split('Financial Planning:')[1]?.split('Growth Strategy:')[0] || '',
    'growth': content.split('Growth Strategy:')[1]?.split('Success Metrics:')[0] || '',
    'metrics': content.split('Success Metrics:')[1] || ''
  };
  
  return sections[section] || '';
};