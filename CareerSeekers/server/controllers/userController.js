/**
 * userController.js
 * This file contains the controllers for the users in the application.
 * It includes functions for updating user information, updating user role, and getting users' information.
 * It uses the User model from the models folder to interact with the database.
 * It also includes error handling using the errorHandler utility function.
 */
import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from "../utils/error.js";
    
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
       return next(errorHandler(401, 'You can update only your account!'));
    }
    try {
        // Hash password before saving
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 12);
        }
        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar // Save Base64 image
            }
        }, { new: true });
        // Remove password from the user object
        const { password, ...rest } = updatedUser._doc;
        // Send the updated user object
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
// Update user SuitableJobs from Genetic Algorithm by id
export const updateSuitableJobs = async (req, res, next) => {
    try {
        // Update user in the database
        const updatedUser = await User.findByIdAndUpdate(req.body.id, {
            $set: {
                SuitableJobs: req.body.SuitableJobs
            }
        }, { new: true });
        // Remove password from the user object
        const { password, ...rest } = updatedUser._doc;
        // Send the updated user object
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }   
};

// Get user traits from the database and use them in findSuitableProfessions
export const getUserTraits = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.id);
        const personTraits = user.traits;
        const personTraitsConverted = convertPersonTraits(personTraits);
        if (!personTraits) {
            return next(errorHandler(404, 'User traits not found'));
        }
        // res the user traits
        res.status(200).json(personTraitsConverted);
    }
    catch (error) {
        next(error);
    }
}

// convert the traits of the user to the format of the traits of the professions
export function convertPersonTraits(traits) {
    // Mapping original trait names to new trait names
    const traitMapping = {
        'Business': 'Business',
        'General Culture': 'GeneralCulture',
        'Arts and Entertainment': 'ArtsAndEntertainment',
        'Science': 'Science',
        'Organization': 'Organization',
        'Service': 'Service',
        'Outdoor': 'Outdoor',
        'Technology': 'Technology'
    };

    let newTraits = {};

    for (let [key, value] of Object.entries(traits)) {
        if (traitMapping[key]) {
            // Assuming you want to round the values to the nearest integer
            newTraits[traitMapping[key]] = Math.round(value);
        }
    }

    return newTraits;
}

// Get the avatar, username and email of all 'Regular' users
export const getUsersPermission = async (req, res, next) => {
    try {
        const users = await User.find({}, { username: 1, email: 1, avatar: 1, role: 1 });
        if (!users || users.length === 0) {
            return next(errorHandler(404, 'Users not found'));
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (req, res, next) => {
    const { userId } = req.params;
    const { role } = req.body;
    try {
        // Validate the role before updating
        if (!['Regular', 'Admin'].includes(role)) {
            return next(errorHandler(400, 'Invalid role'));
        }

        // Find and update the user role
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        res.status(200).json({ success: true, message: 'User role updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
};