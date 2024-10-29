/**
 * This component is responsible for handling the OAuth process with Google.
 * It uses Firebase authentication to sign in with Google.
 * The component dispatches the signInSuccess action when the user successfully signs in.
 * The component redirects the user to the home page after successful sign-in.
 * The component displays a button with the Google icon to initiate the sign-in process.
 * The component handles the sign-in process by calling the signInWithPopup method from Firebase auth.
 * The component sends a POST request to the server with the user's name, email, and photo after successful sign-in.
 * The component dispatches the signInSuccess action with the user data received from the server.
 */
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon from react-icons

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Handle Google sign-in process
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // Send user data to the server
      const res = await fetch('/server/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  return (
    <button
      className="w-full flex items-center justify-center bg-white text-gray-700 border border-gray-300 py-3 rounded-lg uppercase font-semibold hover:bg-gray-100 transition duration-300"
      type="button"
      onClick={handleGoogleClick}
    >
      המשך עם חשבון גוגל
      {/* Google icon */}
      <FcGoogle className="mr-2" size={24} />
    </button>
  );
}
