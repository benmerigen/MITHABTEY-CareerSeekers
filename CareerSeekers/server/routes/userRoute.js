/**
 * userRoute.js is used to route the user requests to the appropriate controller functions
 * It includes routes for updating user details, updating suitable jobs, getting user traits, and getting users' permissions.
 * It uses the express library to define the routes.
 * It uses the verifyToken function from the verifyUser.js file to verify the user's token before accessing the routes.
 * It uses the updateUser, updateSuitableJobs, getUserTraits, getUsersPermission, and updateUserRole functions from the userController.js file to handle the requests.
 * It uses the express library to define the routes.
 */
import express from 'express';
import {updateUser, updateSuitableJobs, getUserTraits, getUsersPermission, updateUserRole } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


router.post('/update/:id', verifyToken, updateUser); // Update user
router.post('/updateSuitableJobs/:id', verifyToken, updateSuitableJobs); // Update suitable jobs
router.post('/getUserTraits',verifyToken,  getUserTraits); // Get user traits 
router.get('/userspermission', verifyToken, getUsersPermission); // Get users permission
router.put('/updaterole/:userId', verifyToken, updateUserRole); // Update user role
export default router;