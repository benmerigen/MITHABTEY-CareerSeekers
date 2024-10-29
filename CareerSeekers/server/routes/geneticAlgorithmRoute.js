/**
 * @file geneticAlgorithmRoute.js is used to handle the routes of genetic algorithm.
 * It includes routes for finding suitable professions and getting suitable jobs.
 * It uses the express library to define the routes.
 * It uses verifyToken from verifyUser.js to verify the user's token. before accessing the routes.
 */
import express from 'express';
import {findSuitableProfessions, getSuitableJobs} from '../controllers/jobMatchingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/findSuitableProfessions',verifyToken, findSuitableProfessions); // Find suitable professions
router.post('/getSuitableJobs',verifyToken, getSuitableJobs); // Get suitable jobs

export default router;