/**
 * jobController.js
 * This file contains the controller functions for handling job-related requests.
 * It includes functions for adding, deleting, and updating jobs, as well as getting job data.
 * It also includes functions for getting all jobs, getting jobs by name, and getting job URLs.
 * It uses the Job model from the models folder to interact with the database.
 * It also includes error handling using the errorHandler utility function.
 */
import Job from '../models/jobModel.js';
import { errorHandler } from "../utils/error.js";

// Add a new job to the database
export const addJob = async (req, res, next) => {
    try {
        const { jobName, Description, AverageSalary, jobField, Prerequisites, facebookPostUrl, GeneralRequirements, standardDay, education, technicalSkills, workLifeBalance } = req.body;

        // Validate the request body
        if (!jobName || !Description || !AverageSalary || !jobField || !Prerequisites || !standardDay || !education || !technicalSkills || !workLifeBalance) {
            return next(errorHandler(400, 'All fields are required.'));
        }

        // Create a new job instance
        const newJob = new Job({
            jobName,
            Description,
            AverageSalary,
            jobField,
            Prerequisites,
            facebookPostUrl,
            GeneralRequirements,
            standardDay,
            education,
            technicalSkills,
            workLifeBalance
        });

        // Save the job to the database
        const savedJob = await newJob.save();
        res.status(201).json({ success: true, data: savedJob });
    } catch (error) {
        next(error);
    }
};

// delete a job from the database by ID
export const deleteJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        // Validate the request body
        if (!jobId) {
            return next(errorHandler(400, 'Job ID is required.'));
        }

        // Find the job by ID and delete it
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return next(errorHandler(404, 'Job not found.'));
        }

        res.status(200).json({ success: true, data: deletedJob });
    } catch (error) {
        next(error);
    }
}

// Get all job names
export const getAllJobsNames = async (req, res, next) => {
    try {
        const jobs = await Job.find({}, 'jobName');
        res.status(200).json({ jobs });
    } catch (error) {
        next(error);
    }
}

// Get the URL of a job by job name
export const getURLofJob = async (req, res, next) => {
    try {
        const jobs = await Job.find({ facebookPostUrl: { $exists: true } }, 'jobName facebookPostUrl -_id');
        res.status(200).json({ jobs });
    } catch (error) {
        next(error);
    }
};


// Get all jobs
export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();

        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        next(error);
    }
};

// get jobname and Prerequisites from all jobs to gentic algorithm
export const getJobsForGA = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        const professionTraits = jobs.map(job => {
            return {
                jobName: job.jobName,
                Prerequisites: job.Prerequisites
            }
        });
        if (!professionTraits) {
            return next(errorHandler(404, 'Professions not found'));
        }
        return professionTraits;
    } catch (error) {
        next(error);
    }
}

// Get 3 jobs by jobName from arr of jobNames to present in myJobs page
export const getJobsByNames = async (req, res, next) => {
    try {
        const { jobNames } = req.body;
        const jobs = await Job.find({ jobName: { $in: jobNames } });
        if (!jobs) {
            return next(errorHandler(404, 'Jobs not found'));
        }
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        next(error);
    }
};


export const updateJobById = async (req, res, next) => {
    try {
        const { jobId } = req.params; // Get jobId from the URL parameters
        const updatedData = req.body; // Get the updated data from the request body

        // Find the job by ID and update it with the new data
        const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        // Return the updated job data
        res.json({ success: true, job: updatedJob });
    } catch (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ success: false, message: 'Failed to update job' });
    }
}

export const getJobDataById = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        // Find the job by ID in the database
        const job = await Job.findById(jobId);

        if (!job) {
            // If no job is found, return a 404 error
            return res.status(404).json({ message: 'Job not found' });
        }

        // Return the job data as JSON
        return res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job data by ID:', error);
        
        // Pass the error to the next middleware
        next(error);
    }
};