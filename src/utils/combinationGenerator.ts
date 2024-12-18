export const generateCombinations = (interests: string[]): string[][] => {
  const combinations: string[][] = [];
  
  // Generate combinations of 2
  for (let i = 0; i < interests.length - 1; i++) {
    for (let j = i + 1; j < interests.length; j++) {
      combinations.push([interests[i], interests[j]]);
    }
  }
  
  // Generate combinations of 3
  for (let i = 0; i < interests.length - 2; i++) {
    for (let j = i + 1; j < interests.length - 1; j++) {
      for (let k = j + 1; k < interests.length; k++) {
        combinations.push([interests[i], interests[j], interests[k]]);
      }
    }
  }
  
  // Generate combinations of 4
  for (let i = 0; i < interests.length - 3; i++) {
    for (let j = i + 1; j < interests.length - 2; j++) {
      for (let k = j + 1; k < interests.length - 1; k++) {
        for (let l = k + 1; l < interests.length; l++) {
          combinations.push([interests[i], interests[j], interests[k], interests[l]]);
        }
      }
    }
  }
  
  // Shuffle and limit to 50 combinations
  return combinations
    .sort(() => Math.random() - 0.5)
    .slice(0, 50);
};

export const generatePrompt = (combinations: string[][]): string => {
  const combinationsText = combinations
    .map((combo, index) => `${index + 1}. ${combo.join(" + ")}`)
    .join("\n");

  return `These are some combinations of my interests that i would like to explore for potential business ideas or ways to make money:
${combinationsText}

Please analyze these combinations and search on the internet which ones have the most potential for a unique business idea. Find the 5 most potential combinations that can become easy to start businesses or way's to make money where i can combine my passions and provide value for others so i can generate income. 
The 5 business ideas must be totally different, they must be actually unique but very promising in these modern times. They also must provide value for individuals or company's and at least 2 of them need to enable me to earn money within 1 month.

The 5 outputs that you return must provide the idea + combination of interests used, the potential clients, what i need to do daily, what i need to charge to generate a decent income, how i can get my first client and how long it will take to earn money.

Please return only the 5 extensive business idea's, seperated by a horizontal line and properly formatted with bold titles, great readability and no other text. Mention at least 1 example of a look-a-like business or person currently active. don't mention any other sources from the internet.`;
};