/**
 * @file questionnaireModel.js is a mongoose schema model for the questionnaire
 * It includes the Questionnaire_Name and an array of questions.
 * It uses the mongoose library to interact with the database.
 */
import mongoose from "mongoose";

// Question schema for the questionnaire
const questionSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true,
        unique: true,
    },
    question_en: {
        type: String,
        required: true
    },
    question_he: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Questionnaire schema with Questionnaire_Name and an array of questions
const questionnaireSchema = new mongoose.Schema({
    Questionnaire_Name: {
        type: String,
        required: true,
        unique: true
    },
    Questions: [questionSchema]
}, { timestamps: true });

const Questionnaire = mongoose.model("Questionnaires", questionnaireSchema);

export default Questionnaire;
