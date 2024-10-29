/**
 * @file jobModel.js is a model representing a job in the database.
 * It includes the jobName, Description, AverageSalary, jobField, Prerequisites, facebookPostUrl, GeneralRequirements, standardDay, education, technicalSkills, and workLifeBalance.
 * It uses the mongoose library to interact with the database.
 */
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    jobName: {      // The name of the job
        type: String,
        required: true,
        unique: true
    },
    Description: {   // A description of the job
        type: String,
        required: true
    },
    AverageSalary: {    // The average salary of the job
        type: Number,
        required: true
    },
    jobField: {     // The field of the job
        type: String,
        required: true
    },
    // The prerequisites of the job based on RAMAK questionnaire
    // prerequisites is an object with the following properties:
    // Business, GeneralCulture, ArtsAndEntertainment, Science, Organization, Service, Outdoor, Technology
    // Each property is a number representing the score of the corresponding trait in the RAMAK questionnaire 
    Prerequisites: {    
        Business: { type: Number, default: 0 },
        GeneralCulture: { type: Number, default: 0 },
        ArtsAndEntertainment: { type: Number, default: 0 },
        Science: { type: Number, default: 0 },
        Organization: { type: Number, default: 0 },
        Service: { type: Number, default: 0 },
        Outdoor: { type: Number, default: 0 },
        Technology: { type: Number, default: 0 }
    },
    facebookPostUrl: {      // The URL of the job post on Facebook
        type: String,
        required: false
    },
    GeneralRequirements: { // The general requirements of the job
        type: [String],
        required: false
    },
    standardDay: {  // A description of a standard day in the job
        type: String,
        required: false
    },
    education: { // A description of the education required for the job
        type: String,
        required: false
    },
    technicalSkills: { // A description of the technical skills required for the job
        type: String, 
        required: false
    },
    workLifeBalance: { // A description of the work-life balance in the job
        type: String,
        required: false
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
