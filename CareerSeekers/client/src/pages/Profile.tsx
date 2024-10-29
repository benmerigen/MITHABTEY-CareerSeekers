/**
 * Profile page for the user to view and update their personal information.
 * The user can update their username, email, password, and avatar.
 * The user can also view their traits and update them using the RAMAK questionnaire.
 */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaInfoCircle } from 'react-icons/fa';
import {fetchWithAuth} from '../utils/fetchWithAuth';

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';
import { jobFields } from '../components/jobs/jobFieldMapping'; // Import the jobFields mapping

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [avatar, setAvatar] = useState(currentUser.avatar); // Store avatar
  const [traits, setTraits] = useState({});
  
  const dispatch = useDispatch();

  // Fetch user traits when the component mounts
  useEffect(() => {
    const fetchTraits = async () => {
      try {
        const res = await fetchWithAuth(`/server/user/getUserTraits/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: currentUser._id }),
        });
        const data = await res.json();
        if (res.ok) {
          // Adjust the trait names before setting the state
          const adjustedTraits: { [key: string]: any } = {};
          for (const [trait, value] of Object.entries(data)) {
            if (trait === 'ArtsAndEntertainment') {
              adjustedTraits['Arts And Entertainment'] = value;
            } else if (trait === 'GeneralCulture') {
              adjustedTraits['General Culture'] = value;
            } else {
              adjustedTraits[trait] = value;
            }
          }
          setTraits(adjustedTraits);
        } else {
          console.error('Failed to fetch traits:', data.message);
        }
      } catch (error) {
        console.error('Error fetching traits:', error);
      }
    };

    fetchTraits();
  }, [currentUser._id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    // Check if a file was selected and if it is an image 
    if (file) {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      if (!allowedTypes.includes(file.type)) {
        alert('נא לבחור קובץ בפורמט PNG, JPG או JPEG.');
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('גודל הקובץ לא יכול לעלות על 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Update avatar state with Base64
        setFormData({ ...formData, avatar: reader.result }); // Include Base64 in formData
      };

      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetchWithAuth(`/server/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };


  // Format the join date
  const formattedJoinDate = new Date(currentUser.createdAt).toLocaleDateString('he-IL');

  return (
    <div className='p-8 max-w-4xl mx-auto my-16 bg-white rounded-xl shadow-lg mt-20' dir='rtl'>
        {/* Container for the entire profile page with padding, max-width, margin, background, rounded corners, shadow, and margin-top */}
      
        <h1 className='text-3xl font-semibold text-gray-800 text-center mb-6'>
            {/* Main heading displaying a personalized welcome message */}
            טוב לראות אותך שוב, {currentUser.username}!
        </h1>

        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mb-8'>
            {/* Flex container for user profile image and information, responsive layout */}
            
            <img 
                src={avatar} 
                alt="profile" 
                className='rounded-full h-36 w-36 object-cover shadow-md border-4 border-blue-500' 
            />
            {/* User profile image with rounded corners, fixed height/width, object cover, shadow, and border */}

            <div className='text-center md:text-right'>
                {/* Container for user details, centered text on mobile and right-aligned on larger screens */}
                
                <h2 className='text-4xl font-bold text-gray-800'>{currentUser.username}</h2>
                {/* User's username in large, bold text */}
                
                <p className='text-lg text-gray-500'>{currentUser.email}</p>
                {/* User's email in medium-sized text */}
                
                <p className='text-sm text-gray-400'>המשתמש נוצר בתאריך: {formattedJoinDate}</p>
                {/* Account creation date in small, gray text */}
            </div>
        </div>

        <p className='text-lg text-gray-700 text-center mb-8'>
            {/* Informational paragraph about updating personal details */}
            בעמוד זה ניתן לעדכן מידע אישי ופרטים נוספים
        </p>

        <div className='flex flex-col md:flex-row justify-center items-start gap-10 mb-8'>
            {/* Flex container for profile features and update form, responsive layout */}
            
            <div className='flex flex-col justify-between w-full md:w-1/2'>
                {/* Container for features section, full width on mobile and half width on larger screens */}
                
                <div className='bg-blue-50 p-6 rounded-lg shadow-md w-full'>
                    {/* Container for displaying user traits with background color, padding, rounded corners, and shadow */}
                    
                    <h3 className='text-2xl font-semibold text-blue-600 mb-4'>
                        {/* Subheading for user traits section */}
                        התכונות שלך
                    </h3>
                    
                    <ul className='space-y-2'>
                        {/* List of user traits */}
                        {Object.entries(traits).map(([trait, value]) => (
                            <li key={trait} className='flex justify-between items-center text-lg text-gray-700'>
                                {/* List item for each trait */}
                                <span>{jobFields[trait]?.hebrew || trait}:</span> <span>{value as React.ReactNode}</span>
                                {/* Display trait label and value */}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='flex justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md mt-4'>
                    {/* Container for link to update traits with background color, padding, rounded corners, and shadow */}
                    <Link to='/RamakQuestionnaire' className='text-blue-600 hover:underline'>
                        {/* Link to RAMAK questionnaire page */}
                        עדכון תכונות בשאלון RAMAK
                    </Link>
                </div>
            </div>

            <div className='flex flex-col justify-between w-full md:w-1/2'>
                {/* Container for the update form, full width on mobile and half width on larger screens */}
                
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {/* Form for updating user information, vertical layout with gaps between fields */}
                    
                    {['username', 'email', 'password'].map((field, index) => (
                        <div key={index} className='flex items-center'>
                            {/* Container for each input field with flex layout */}
                            
                            <div className='w-11/12'>
                                {/* Container for input field, taking most of the width */}
                                
                                <input
                                    type={field === 'password' ? 'password' : field}
                                    placeholder={field === 'username' ? 'שם משתמש' : field === 'email' ? 'דואר אלקטרוני' : 'סיסמה'}
                                    defaultValue={currentUser[field]}
                                    id={field}
                                    onChange={handleChange}
                                    className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                                />
                                {/* Input field for username, email, or password with styling and focus ring */}
                            </div>

                            <div className='w-1/12 flex justify-center'>
                                {/* Container for information icon */}
                                <div className='relative group'>
                                    <FaInfoCircle className='text-blue-500' />
                                    {/* Information icon */}
                                    
                                    <div className='hidden group-hover:block absolute -top-8 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 text-right'>
                                        {/* Tooltip displayed on hover */}
                                        {field === 'username' ? 'שם משתמש' : field === 'email' ? 'דואר אלקטרוני' : 'סיסמה'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Image Upload Section */}
                    <div className='flex items-center'>
                        <div className='w-11/12'>
                            {/* Container for file input field */}
                            
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={handleFileChange}
                                className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
                            />
                            {/* File input field for image upload with styling and focus ring */}
                        </div>
                        <div className='w-1/12 flex justify-center'>
                            {/* Container for information icon */}
                            <div className='relative group'>
                                <FaInfoCircle className='text-blue-500' />
                                {/* Information icon */}
                                
                                <div className='hidden group-hover:block absolute -top-8 right-0 bg-gray-800 text-white text-xs rounded py-1 px-2 text-right'>
                                    {/* Tooltip displayed on hover */}
                                    העלאת תמונה
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='-mt-2'>
                        <span className='text-sm text-gray-600 text-center mt'>בחר תמונה (תמיכה בפורמטים PNG, JPG, JPEG)</span>
                        {/* Text indicating supported image formats */}
                    </div>

                    <button 
                        disabled={loading} 
                        className='bg-blue-600 text-white rounded-lg p-3 uppercase hover:bg-blue-700 transition disabled:opacity-70 mt-3'>
                        {/* Button for submitting the form */}
                        {loading ? 'מעדכן...' : 'עדכן פרטים'}
                    </button>
                    {updateSuccess && <p className='text-green-600 text-center'>עדכון הצליח!</p>}
                    {/* Message indicating successful update */}
                </form>

                {error && <p className='text-red-600 text-center'>{error}</p>}
                {/* Message indicating an error */}
            </div>
        </div>
    </div>
);

}
