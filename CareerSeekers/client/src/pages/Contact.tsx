/**
 * Contact Component
 * 
 * This component provides users with options to contact or connect with the site administrators 
 * through Facebook, email, and LinkedIn. It includes a link to join a Facebook group, 
 * and displays icons for alternative contact methods.
 */

import React from 'react';
import { FaFacebook, FaEnvelope, FaLinkedin } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">צרו קשר</h1>

      {/* Facebook Group Link */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center mb-8">
        <h2 className="text-xl font-bold mb-4">הצטרפו לקבוצת הפייסבוק שלנו!</h2>
        <a
          href="https://www.facebook.com/groups/612789808874188"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <FaFacebook className="inline ml-2" />
          לקבוצת הפייסבוק
        </a>
      </div>

      {/* Contact Icons */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">אפשרויות נוספות ליצירת קשר</h2>
        
        {/* Email Link */}
        <div className="mb-4">
          <a
            href="mailto:irit@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 flex items-center justify-center space-x-2"
          >
            <FaEnvelope className="text-2xl ml-2 text-gray-700" />
            <span className="text-gray-700">iritho@gmail.com</span>
          </a>
        </div>

        {/* LinkedIn Link */}
        <div className="mb-4">
          <a
            href="https://www.linkedin.com/in/irit-hommsi-5890991/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 flex items-center justify-center space-x-2"
          >
            <FaLinkedin className="text-2xl ml-2 text-gray-700" />
            <span className="text-gray-700">LinkedIn</span>
          </a>
        </div>

        {/* Facebook Profile Link */}
        <div className="mb-4">
          <a
            href="https://www.facebook.com/iritho"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 flex items-center justify-center space-x-2"
          >
            <FaFacebook className="text-2xl ml-2 text-gray-700" />
            <span className="text-gray-700">Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
