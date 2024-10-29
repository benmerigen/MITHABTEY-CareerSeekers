/**
 * AdminCard component
 * this component is a card that represents an admin action
 * @param title - the title of the card
 * @param icon - the icon of the card
 * @param onClick - the function to call when the card is clicked
 * @returns - the AdminCard component
 */
import React from 'react';

interface AdminCardProps {
    title: string;
    icon: JSX.Element;
    onClick: () => void;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, icon, onClick }) => {
    return (
        <div
            className="bg-white overflow-hidden shadow rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            onClick={onClick}
        >
            <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate text-right">
                                {title}
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900 text-right">
                                {title === "הוספת מקצוע חדש למסד התנונים" ? "הוספת מקצוע" :
                                 title === "מחיקת מקצוע מהמסד נתונים" ? "מחיקת מקצוע" :
                                 title === "עדכון מקצוע קיים במסד הנתונים" ? "עדכון מקצוע" :
                                 "ניהול משתמשים"}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCard;