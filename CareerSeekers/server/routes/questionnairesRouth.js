/**
 * questionnairesRoute.js
 * This file defines the routes for handling questionnaires.
 * It includes routes for getting a questionnaire by name, calculating the score of the questionnaire, and updating user traits in the database.
 * It uses the verifyToken function from the verifyUser.js file to verify the user's token before accessing the routes.
 * It uses the getQuestionnaire, calculateScore, and updateUserTraits functions from the questionnairesController.js file to handle the requests.
 * It uses the express library to define the routes.
 */
import express from 'express';
import { calculateScore, getQuestionnaire, updateUserTraits } from '../controllers/questionnairesController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Get a questionnaire by name
router.post('/getQuestionnaire',verifyToken, getQuestionnaire);
router.post('/calculateScore',verifyToken, calculateScore);
router.post('/updateUserTraits/:id',verifyToken, updateUserTraits);


export default router;