/**
 * ForgotPassword Component
 *
 * This component provides a form for users to request a password reset by submitting their email address.
 * If the email is registered, a reset link will be sent to the user. Upon successful submission, the user
 * will be redirected to the sign-in page. In case of failure, an appropriate error message is displayed.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa"; // Icon for email input field
import logoImage from "../assets/mithabteyLogo.png"; // Company logo

export default function ForgotPassword() {
    // State variables to manage the email input, loading state, and any message (success/error)
    const [email, setEmail] = useState<string>(''); // User's email input
    const [loading, setLoading] = useState<boolean>(false); // Loading state during async request
    const [message, setMessage] = useState<string | null>(null); // Message to display success or error
    const navigate = useNavigate(); // React Router's hook to programmatically navigate users

    /**
     * handleChange - Updates the email state when the user types in the email input field.
     *
     * @param e - Event triggered when the input value changes
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    /**
     * handleSubmit - Handles form submission to send the forgot password request.
     * Makes a POST request to the server to initiate the password reset process.
     *
     * @param e - Event triggered when the form is submitted
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Set loading state to true while the request is in progress

        try {
            // Send POST request to the forgot password endpoint with the user's email
            const res = await fetch('/server/auth/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send email in the request body
            });

            if (res.ok) {
                // On successful email submission, navigate to the sign-in page
                navigate('/signin');
            } else {
                // Display error message if the email submission fails
                setMessage('Failed to send email. Please try again.');
            }
        } catch (error) {
            // Catch any network errors and display an error message
            setMessage('An error occurred. Please try again.');
        } finally {
            // Reset loading state once the request completes (success or failure)
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-3"
            dir="rtl"
            style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}
        >
            {/* Container for the form, logo, and messages */}
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
                
                {/* Logo section */}
                <div className="flex justify-center mb-6">
                    <img src={logoImage} alt="Company Logo" className="h-16 w-16" />
                </div>
                
                {/* Title and description */}
                <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">איפוס סיסמא</h1>
                <p className="text-center text-gray-600 mb-4">הכנס את המייל שלך על מנת לאפס את הסיסמא</p>
                
                {/* Form for submitting the email */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Email input field with icon */}
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="מייל"
                            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="email"
                            value={email}
                            onChange={handleChange} // Update email state on input change
                            required // Mark the input as required
                        />
                        {/* Email icon inside the input field */}
                        <FaEnvelope className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    
                    {/* Submit button, disabled when loading */}
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg uppercase font-semibold hover:bg-indigo-500 disabled:bg-indigo-300 transition duration-300"
                    >
                        {loading ? 'שולח...' : 'איפוס סיסמא'} {/* Button text changes based on loading state */}
                    </button>
                </form>
                
                {/* Display success or error message if available */}
                {message && <p className="text-center mt-4 text-indigo-600">{message}</p>}
                
                {/* Link to sign-in page if the user remembers their password */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        זוכר את הסיסמא שלך?{' '}
                        <a href="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">התחבר</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
