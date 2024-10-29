// Calculate the normalized scores for RAMAK questionnaire
function calculateNormalizedScores(answers) {
    // Map of traits and their corresponding questions based on RAMAK questionnaire
    const traits = {
        'Business': {
            'Level 1': [9, 45, 54],
            'Level 2': [20, 28, 36],
            'Level 3': [2, 59, 68]
        },
        'General Culture': {
            'Level 1': [21, 30, 51],
            'Level 2': [4, 10, 46],
            'Level 3': [35, 62, 71]
        },
        'Arts and Entertainment': {
            'Level 1': [3, 27, 52],
            'Level 2': [13, 34, 60],
            'Level 3': [23, 44, 67]
        },
        'Science': {
            'Level 1': [7, 15, 57],
            'Level 2': [22, 25, 43],
            'Level 3': [32, 53, 65]
        },
        'Organization': {
            'Level 1': [12, 18, 66],
            'Level 2': [7, 37, 40],
            'Level 3': [11, 29, 41]
        },
        'Service': {
            'Level 1': [0, 33, 48],
            'Level 2': [19, 58, 64],
            'Level 3': [11, 29, 41]
        },
        'Outdoor': {
            'Level 1': [38, 63, 69],
            'Level 2': [1, 31, 50],
            'Level 3': [2, 8, 17]
        },
        'Technology': {
            'Level 1': [24, 39, 42],
            'Level 2': [16, 49, 70],
            'Level 3': [5, 14, 61]
        }
    };
    
    
    const scoreMap = { 'Y': 2, '?': 1, 'N': 0 }; // Map of scores for each answer
    const weights = { "Level 1": 3, "Level 2": 2, "Level 3": 1 }; // Weights for each level
    const traitScores = {};
    const maxRawScore = 18; // Maximum raw score for each trait (9 questions, 2 points each)
    const maxWeightedScore = (3 * 2 * 3) + (2 * 2 * 3) + (1 * 2 * 3); // Maximum weighted score for each trait
    const totalMaxWeightedScore = maxWeightedScore * Object.keys(traits).length; // Total max weighted score for all traits

    let totalWeightedScores = 0; // To accumulate the total weighted scores across all traits
    // Calculate the raw and weighted scores for each trait
    for (const trait in traits) {
        let totalRawScore = 0;
        let totalWeightedScore = 0;
        const levels = traits[trait];
        for (const level in levels) {
            const items = levels[level];

            items.forEach(item => {
                const rawScore = scoreMap[answers[item]];
                // if rawScore is not undefined, add it to the total raw and weighted scores
                if (rawScore !== undefined) {
                    totalRawScore += rawScore;
                    totalWeightedScore += rawScore * weights[level];
                }
             
            });    
        }
        // Normalize the raw and weighted scores
        const normalizedRawScore = (totalRawScore / maxRawScore) * 100;
        const normalizedWeightedScore = (totalWeightedScore / maxWeightedScore) * 100;
        traitScores[trait] = {
            raw_score: normalizedRawScore,
            weighted_score: normalizedWeightedScore,
            total_weighted_score: totalWeightedScore
        };

        // Accumulate the total weighted scores
        totalWeightedScores += totalWeightedScore;
    }
    // Calculate the percentage contribution of each trait to the total weighted score
    const overallPercentages = {};
    for (const trait in traitScores) {
        const percentage = (traitScores[trait].total_weighted_score / totalWeightedScores) * 100;
        overallPercentages[trait] = parseFloat(percentage.toFixed(2));
    }

    return overallPercentages;
}

export { calculateNormalizedScores };
