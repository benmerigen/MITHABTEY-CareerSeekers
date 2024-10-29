/**
 * Header component
 * This component is used to display the header of the website.
 * It includes the website logo, navigation links, and user profile menu.
 * The header is displayed at the top of the page.
 * The header changes its appearance when the user scrolls down the page.
 * The header includes a dropdown menu for user profile options.
 * The dropdown menu displays different options based on the user's authentication status.
 * The dropdown menu includes links to the user's profile, admin panel, and sign-out functionality.
 * The header also includes links to the home page and user authentication pages.
 * The header uses Tailwind CSS for styling and responsiveness.
 * The header component uses Redux for managing user authentication state.
 * The header component dispatches actions to sign out the user when the sign-out option is selected.
 * The header component uses React Router for navigation between pages.
 */
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import homeImage from '../assets/home.png';
import MithabteyUmage from '../assets/mithabteyLogo.png';
import { useEffect, useState } from 'react';
import { FaUser, FaCog, FaBriefcase, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function Header() {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  // Handle sign-out functionality
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/server/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };
  // Handle scroll event to change header appearance
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profilePicture = currentUser?.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  return (
    <header 
      className={`bg-slate-200 shadow-md fixed top-0 left-0 right-0 w-full transition-all duration-300 z-50 ${isScrolled ? 'h-17 p-4 opacity-95' : 'h-16 p-3'}`}
    >
      <div className='flex justify-between items-center max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Logo and Title */}
        <Link to='home' className='flex items-center'>
          <img 
            className='h-8 w-8 object-cover' 
            src={MithabteyUmage} 
            style={{ marginRight: '10px' }} 
            alt="Logo" 
          />
          <h1 
            className={`font-bold text-base sm:text-xl transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-lg'}`}
          >
            <span className='text-slate-700'>מתחבטי</span>
            <span className='text-slate-500'>מקצוע</span>
          </h1>
        </Link>

        {/* Navigation and User Menu */}
        <div className='flex items-center'>
          {/* Home Icon */}
          <Link to='home'>
            <div 
              className="w-7 h-7 bg-cover bg-center mr-5" 
              style={{ backgroundImage: `url(${homeImage})` }} 
              aria-label="Home"
            ></div>
          </Link>

          {/* User Menu */}
          <Menu as="div" className="justify-center items-center relative text-left">
            <MenuButton>
              <img 
                className='rounded-full h-11 w-11 object-cover' 
                src={profilePicture} 
                alt="User Profile"
              />
            </MenuButton>

            <MenuItems 
              className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-60 transition-all duration-300 ease-in-out"
            >
              <div className="py-1">
                {currentUser && (
                  <>
                    <div className="flex flex-col items-center px-4 py-2 text-sm text-gray-700">
                      <img 
                        className="h-8 w-8 rounded-full mb-2" 
                        src={profilePicture} 
                        alt="User avatar" 
                      />
                      <span>{currentUser.username}</span>
                    </div>
                    <div className="border-t border-gray-300 my-2"></div>
                  </>
                )}

                {/* Conditional Menu Items */}
                {currentUser && (
                  <MenuItem>
                    {({ active }) => (
                      <Link 
                        to='/profile' 
                        className={`flex items-center justify-end text-right px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        <span>פרופיל אישי</span>
                        <FaUser className="ml-2" />
                      </Link>
                    )}
                  </MenuItem>
                )}
                {currentUser && currentUser.role === 'Admin' && (
                  <MenuItem>
                    {({ active }) => (
                      <Link 
                        to='/adminpanel' 
                        className={`flex items-center justify-end text-right px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        <span>פאנל מנהל</span>
                        <FaCog className="ml-2" />
                      </Link>
                    )}
                  </MenuItem>
                )}
                {currentUser && (
                  <MenuItem>
                    {({ active }) => (
                      <Link 
                        to='/geneticAlgorithm' 
                        className={`flex items-center justify-end text-right px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        <span>המקצועות שלי</span>
                        <FaBriefcase className="ml-2" />
                      </Link>
                    )}
                  </MenuItem>
                )}
                {currentUser && (
                  <MenuItem>
                    {({ active }) => (
                      <button 
                        onClick={handleSignOut} 
                        className={`flex items-center justify-end w-full text-right px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                      >
                        <span>התנתקות</span>
                        <FaSignOutAlt className="ml-2" />
                      </button>
                    )}
                  </MenuItem>
                )}
                {!currentUser && (
                  <>
                    <MenuItem>
                      {({ active }) => (
                        <Link 
                          to='signin' 
                          className={`flex items-center justify-end text-right px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          <span>התחברות</span>
                          <FaSignInAlt className="ml-2" />
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link 
                          to='signup' 
                          className={`flex items-center justify-end text-right px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                        >
                          <span>הרשמה</span>
                          <FaUserPlus className="ml-2" />
                        </Link>
                      )}
                    </MenuItem>
                  </>
                )}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  );
}
