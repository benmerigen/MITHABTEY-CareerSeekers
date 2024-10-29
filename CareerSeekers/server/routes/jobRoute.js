/**
 * jobRoute.js is used to route the requests to the appropriate controller functions
 * It includes routes for adding, deleting, updating, and getting all jobs.
 * It uses the Job model from the models folder to interact with the database.
 * It uses the verifyToken function from the verifyUser.js file to verify the user's token before accessing the routes.
 */
import express from 'express';
import { addJob, deleteJob, getAllJobsNames, getURLofJob,getJobsByNames, updateJobById, getJobDataById } from '../controllers/jobController.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getAllJobs } from '../controllers/jobController.js';

const router = express.Router();

router.post('/addjob', verifyToken, addJob); // Add job
router.delete('/deletejob/:jobId', verifyToken, deleteJob); // Delete job by id
router.get('/getalljobnames', verifyToken, getAllJobsNames); // Get all job names
router.get('/getURLjobs', verifyToken, getURLofJob); // Get job URLs
router.get('/getAllJobs',verifyToken, getAllJobs); // Get all jobs
router.post('/getJobsByNames',verifyToken, getJobsByNames); // Get jobs by names
router.put('/updatejob/:jobId', verifyToken, updateJobById); // Update job by id
router.get('/jobData/:jobId', verifyToken, getJobDataById); // Get job data by id

export default router;