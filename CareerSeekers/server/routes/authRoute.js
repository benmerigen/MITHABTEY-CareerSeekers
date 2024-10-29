/**
 * authRoute.js is used to define the routes for the authentication of the user.
 * It includes routes for signing up, signing in, signing out, signing in with google, and resetting the password.
 * It uses the express library to define the routes.
 */
import express from 'express';
import { signin, signup, signout, google, forgotPassword,resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup); // signup route
router.post('/signin', signin); // signin route
router.get('/signout',signout); // signout route
router.post('/google', google); // google signin/signup route
router.post('/forgotPassword', forgotPassword); // forgot password route
router.post('/resetPassword/:id/:token', resetPassword); // reset password route with id and token

export default router;