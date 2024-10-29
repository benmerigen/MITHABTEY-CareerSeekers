/**
 * ResetPassword component is a functional component that allows users to reset their password
 * by entering a new password and confirming it. The component sends a POST request to the server
 * to reset the password using the provided token and user ID.
 */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import logoImage from '../assets/mithabteyLogo.png';

// ResetPassword component definition
export default function ResetPassword() {
    // State hooks for password, confirm password, loading, and message
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    // Hooks for URL parameters and navigation
    const { token } = useParams<{ token: string }>();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Event handler for password input change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Event handler for confirm password input change
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    // Event handler for form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Check if the passwords match
        if (password !== confirmPassword) {
            setMessage('סיסמאות לא תואמות');
            setLoading(false);
            return;
        }

        try {
            // Perform the password reset request
            const res = await fetch(`/server/auth/resetpassword/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });
            // Handle the response
            if (res.ok) {
                setMessage('הסיסמא אופסה בהצלחה');
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
            } else {
                setMessage('לא הצלחנו לאפס את הסיסמא. אנא נסה שוב');
            }
        } catch (error) {
            setMessage('ישנה שגיאה, בבקשה נסה שנית');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-3" dir="rtl" style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <img src={logoImage} alt="Company Logo" className="h-16 w-16" />
                </div>
                <h1 className="text-4xl text-center font-bold mb-8 text-gray-800">איפוס סיסמא</h1>
                <p className="text-center text-gray-600 mb-4">הכנס את הסיסמא החדשה שלך</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="סיסמא חדשה"
                            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <FaLock className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="אמת את הסיסמא"
                            className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        <FaLock className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg uppercase font-semibold hover:bg-indigo-500 disabled:bg-indigo-300 transition duration-300"
                    >
                        {loading ? 'מאפס...' : 'איפוס סיסמא'}
                    </button>
                </form>
                {message && <p className="text-center mt-4 text-indigo-600">{message}</p>}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        חזור{' '}
                        <a href="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">להתחברות</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
