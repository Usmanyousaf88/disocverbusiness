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

Please analyze these combinations and search on the internet which ones have the most potential through analyzing if there is a market-ask for. Find the 5 most potential combinations that can be easy to start business ideas where i can combine my passions and provide value for others so i can generate income. The 5 business ideas must be totally different, they must provide value for individuals or company's and at least 2 of them need to enable me to earn money within 1 month.

The 5 ideas that you return must provide the idea + combination of interests used, the potential clients, what i need to do daily, what i need to charge to generate a decent income, how i can get my first client and how long it will take to earn money.

Please return only the 5 extensive business idea's, seperated by a horizontal line and with clean HTML format, bold titles, great readability and no other text. Mention at least 1 example of a look-a-like business or person currently active. don't mention any other sources from the internet.`;
};