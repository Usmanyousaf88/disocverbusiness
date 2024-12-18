export const generateCombinations = (interests: string[]): string[][] => {
  const combinations: string[][] = [];
  
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
  
  // Generate combinations of 5
  for (let i = 0; i < interests.length - 4; i++) {
    for (let j = i + 1; j < interests.length - 3; j++) {
      for (let k = j + 1; k < interests.length - 2; k++) {
        for (let l = k + 1; l < interests.length - 1; l++) {
          for (let m = l + 1; m < interests.length; m++) {
            combinations.push([interests[i], interests[j], interests[k], interests[l], interests[m]]);
          }
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

  return `These are some combinations of my interests that i would like to explore for potential business ideas:
${combinationsText}

Please analyze these combinations and search them all on the internet and find the 5 most potential combinations that can be easy to start business ideas where i can follow my passion and provide value for others so i can generate income. 

The 5 business ideas that you return must provide the idea, the potential clients, what i need to do daily, what i need to charge to generate a decent income, how i can get my first client and how long it will take to earn money.

Please return only the 5 extensive business idea's without anything else and don't mention any sources from the internet.`;
};