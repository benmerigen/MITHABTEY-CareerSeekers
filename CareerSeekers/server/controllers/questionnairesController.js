/**
 * questionnairesController.js
 * This file contains the controllers for the questionnaires in the application.
 * It includes functions for getting a questionnaire by name, calculating the score of the questionnaire, and updating user traits in the database.
 * It uses the Questionnaire model from the models folder to interact with the database.
 * the calculation of the score is done by the calculateNormalizedScores function from the RAMAKcontroller.js file. 
 */
import Questionnaire from "../models/questionnaireModel.js";
import { errorHandler } from "../utils/error.js";
import { calculateNormalizedScores } from "../controllers/RAMAKcontroller.js";
import User from "../models/userModel.js";

// Get a questionnaire by name
export const getQuestionnaire = async (req, res, next) => {
    const Questionnaire_Name = req.body.Questionnaire_Name;
    try {
        const questionnaireVal = await Questionnaire.findOne(({ Questionnaire_Name }));
        if (!questionnaireVal) {
            return next(errorHandler(404, 'Questionnaire not found'));
        }
        res.status(200).json(questionnaireVal);
    } catch (error) {
        next(error);
        console.log(error);
    }
};

// calaculate the score of the questionnaire
export const calculateScore = async (req, res, next) => {
    const { answers } = req.body;
    try {
        res.status(200).json(calculateNormalizedScores(answers));
    } catch (error) {
        next(error);
        console.log(error);
    }
};

// update user traits in the database after calculating the score
export const updateUserTraits = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                traits: req.body.traits               
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
        console.log(error);
    }
}

