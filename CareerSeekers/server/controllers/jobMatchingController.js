/**
 * jobMatchingController.js
 * This file contains the controllers for finding suitable professions for the user
 * It includes functions for finding suitable professions by genetic algorithm,
 * getting suitable jobs of the user from the database, and getting user traits from the database
 * It uses the User model from the models folder to interact with the database
 * 
 */
import User from '../models/userModel.js';
import { errorHandler } from "../utils/error.js";
import { geneticAlgorithm } from "../controllers/geneticAlgorithmController.js"
import { updateSuitableJobs } from "../controllers/userController.js"
import { getJobsForGA } from "../controllers/jobController.js"
import {convertPersonTraits } from "../controllers/userController.js"

// Find suitable professions by genetic algorithm
// numGenerations = 100; populationSize = 50; professionTraits = getAllJobs(); personTraits = getUserTraits();
// update the user's suitable jobs in the database
export const findSuitableProfessions = async (req, res, next) => {
    try {
        const professionTraits = await getJobsForGA(req, res, next);
        const personTraits = await getUserTraits(req, res, next);
        let numGenerations = 100;
        let populationSize = 50;
        let matchedProfessions = geneticAlgorithm(personTraits, professionTraits, numGenerations, populationSize);
        req.body.SuitableJobs = matchedProfessions;
        // Update user's suitable jobs in the database with the matched professions
        await updateSuitableJobs(req, res, next);
    }
    catch (error) {
        next(error);
    }
}


// Get suitable jobs of the user from the database
export const getSuitableJobs = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        const suitableJobs = user.SuitableJobs;
        // if the array is empty, return suitable jobs not found
        if (suitableJobs.length === 0) {
            return next(errorHandler(404, 'Suitable jobs not found'));
        }
        res.status(200).json(suitableJobs);
    }
    catch (error) {
        next(error);
    }
}

// Get user traits from the database and use them in findSuitableProfessions
export const getUserTraits = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        const personTraits = user.traits;
        const personTraitsConverted = convertPersonTraits(personTraits);
        if (!personTraits) {
            return next(errorHandler(404, 'User traits not found'));
        }
        return personTraitsConverted;
    }
    catch (error) {
        next(error);
    }
}

