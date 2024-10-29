/**
 * AdminPanel Component
 * 
 * This component is responsible for rendering the admin dashboard, allowing the site administrator 
 * to manage users and jobs in the system. The dashboard displays a set of actions such as adding, 
 * deleting, and updating job information, as well as managing users (only available to the manager).
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaUsers, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AdminCard from '../components/adminpanel/AdminCard';

const AdminPanel: React.FC = () => {
    const { currentUser } = useSelector((state: any) => state.user);  // Retrieves the current user from the Redux store
    const navigate = useNavigate();

    const managerEmail = import.meta.env.VITE_MANAGEREMAIL;  // The email of the site manager

    /**
     * handleNavigation
     * 
     * Navigates to a specified path when an admin card is clicked.
     * 
     * @param path - The route to navigate to
     */
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">{currentUser.username}, שלום</h1>
                <h3 className='text-xl sm:text-2xl font-bold mt-6 text-gray-600 text-center'>
                    זהו דף הנחיתה של מנהלת האתר
                </h3>
                <h3 className='text-xl sm:text-2xl font-bold mt-6 text-gray-600 text-center mb-10'>
                    כאן ניתן לנהל את המידע אודות המשתמשים והמקצועות שבאתר
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <AdminCard
                        title="הוספת מקצוע חדש למסד התנונים"
                        icon={<FaPlus className="text-green-500" />}
                        onClick={() => handleNavigation('/adminpanel/addjob')}
                    />
                    <AdminCard
                        title="מחיקת מקצוע מהמסד נתונים"
                        icon={<FaTrash className="text-red-500" />}
                        onClick={() => handleNavigation('/adminpanel/deletejob')}
                    />
                    {currentUser.email === managerEmail && (
                        <AdminCard
                            title=" ניהול משתמשים במערכת"
                            icon={<FaUsers className="text-purple-500" />}
                            onClick={() => handleNavigation('/adminpanel/managepermissions')}
                        />
                    )}
                    <AdminCard
                        title="עדכון מקצוע קיים במסד הנתונים"
                        icon={<FaEdit className="text-blue-500" />}
                        onClick={() => handleNavigation('/adminpanel/updatejob')}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
