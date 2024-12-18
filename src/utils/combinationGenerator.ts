export const generateCombinations = (interests: string[]): string[][] => {
  const allCombinations: string[][] = [];
  
  // Generate combinations of 2
  for (let i = 0; i < interests.length - 1; i++) {
    for (let j = i + 1; j < interests.length; j++) {
      allCombinations.push([interests[i], interests[j]]);
    }
  }
  
  // Generate combinations of 3
  for (let i = 0; i < interests.length - 2; i++) {
    for (let j = i + 1; j < interests.length - 1; j++) {
      for (let k = j + 1; k < interests.length; k++) {
        allCombinations.push([interests[i], interests[j], interests[k]]);
      }
    }
  }
  
  // Generate combinations of 4
  for (let i = 0; i < interests.length - 3; i++) {
    for (let j = i + 1; j < interests.length - 2; j++) {
      for (let k = j + 1; k < interests.length - 1; k++) {
        for (let l = k + 1; l < interests.length; l++) {
          allCombinations.push([interests[i], interests[j], interests[k], interests[l]]);
        }
      }
    }
  }
  
  // Shuffle the combinations
  const shuffled = allCombinations.sort(() => Math.random() - 0.5);
  
  // Return exactly 50 combinations if possible, otherwise return all available combinations
  return shuffled.slice(0, Math.min(50, shuffled.length));
};

export const generatePrompt = (combinations: string[][]): string => {
  const combinationsText = combinations
    .map((combo, index) => `${index + 1}. ${combo.join(" + ")}`)
    .join("\n");

  return `These are some combinations of my interests that i would like to explore for potential business ideas or ways to make money:
${combinationsText}

Please analyze these combinations and do a search for every combination on the internet to find the 20 most potential combinations that can become a business idea. apply your reasoning to find the 10 most potential combinations that would have the most potential for me to make money where i can combine my passions and provide value for others. The 10 best business ideas must be totally different, they must provide value for individuals or company's and at least 2 of them need to enable me to earn money within 1 month.

The 10 ideas that you return must provide the following in a clean list:
- Name
- Example business or person

Please return only the 10 idea's, separated by a horizontal line with clean HTML format, bold titles and no other text. Mention 1 example of a look-a-like business or person currently active. don't mention any other sources from the internet.`;
};