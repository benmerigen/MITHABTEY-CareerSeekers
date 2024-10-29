// Initialize the population with random individuals
function initializePopulation(size, numProfessions) {
    return Array.from({ length: size }, () => 
        Array.from({ length: 3 }, () => Math.floor(Math.random() * numProfessions))
    );
}

// Calculate the match percentage between a person's traits and a profession's traits
function calculateMatchPercentage(personTraits, professionTraits) {
    const absoluteDifferences = Object.keys(personTraits).reduce((acc, trait) => {
        acc[trait] = Math.abs(personTraits[trait] - professionTraits[trait]);
        return acc;
    }, {});
    const totalDifference = Object.values(absoluteDifferences).reduce((sum, diff) => sum + diff, 0);
    const maxDifference = Object.keys(personTraits).length * 100;
    return (1 - (totalDifference / maxDifference)) * 100;
}

// Evaluate the fitness of an individual by calculating the average match percentage for their professions
function evaluateIndividual(individual, personTraits, professionTraits) {
    const matchPercentages = individual.map(professionIndex => {
        const profession = professionTraits[professionIndex];
        return {
            job: profession.jobName,
            percentage: calculateMatchPercentage(personTraits, profession.Prerequisites)
        };
    });
    const totalMatchPercentage = matchPercentages.reduce((sum, match) => sum + match.percentage, 0);
    return {
        averageMatch: totalMatchPercentage / individual.length,
        details: matchPercentages
    };
}

// Select two parents from the population based on their fitness scores using roulette wheel selection
function selectParents(population, fitnessScores) {
    const totalFitness = fitnessScores.reduce((sum, score) => sum + score.averageMatch, 0);
    const selectionProbs = fitnessScores.map(score => score.averageMatch / totalFitness);
    return [population[weightedRandomIndex(selectionProbs)], population[weightedRandomIndex(selectionProbs)]];

    function weightedRandomIndex(weights) {
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i];
            if (random <= 0) return i;
        }
    }
}

// Perform one-point crossover between two parents to produce two offspring
function crossover(parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * (parent1.length - 1)) + 1;
    const offspring1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
    const offspring2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));
    return [offspring1, offspring2];
}

// Mutate an individual by randomly changing one of their professions
function mutate(individual, numProfessions) {
    const mutationIndex = Math.floor(Math.random() * individual.length);
    individual[mutationIndex] = Math.floor(Math.random() * numProfessions);
}

// The main genetic algorithm function
function geneticAlgorithm(personTraits, professionTraits, numGenerations, populationSize) {
    let population = initializePopulation(populationSize, professionTraits.length);

    for (let generation = 0; generation < numGenerations; generation++) {
        const fitnessScores = population.map(individual => 
            evaluateIndividual(individual, personTraits, professionTraits)
        );
        const sortedPopulation = [...population].sort((a, b) => 
            evaluateIndividual(b, personTraits, professionTraits).averageMatch - 
            evaluateIndividual(a, personTraits, professionTraits).averageMatch
        );
        let newPopulation = sortedPopulation.slice(0, 2);

        while (newPopulation.length < populationSize) {
            const [parent1, parent2] = selectParents(sortedPopulation, fitnessScores);
            let [offspring1, offspring2] = crossover(parent1, parent2);
            mutate(offspring1, professionTraits.length);
            mutate(offspring2, professionTraits.length);
            newPopulation.push(offspring1, offspring2);
        }
        population = newPopulation;
    }

    const finalFitnessScores = population.map(individual => 
        evaluateIndividual(individual, personTraits, professionTraits)
    );
    const finalSortedPopulation = [...finalFitnessScores].sort((a, b) => 
        b.averageMatch - a.averageMatch
    );
    // Return the top 3 unique jobs from the best individual
    const uniqueJobs = [];
    for (const score of finalSortedPopulation) {
        for (const job of score.details) {
            if (!uniqueJobs.find(j => j.job === job.job)) {
                uniqueJobs.push(job);
            }
            if (uniqueJobs.length === 3) {
                break;
            }
        }
        if (uniqueJobs.length === 3) {
            break;
        }
    }
    return uniqueJobs;
}

export { geneticAlgorithm };
