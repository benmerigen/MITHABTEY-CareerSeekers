/**
 * ManagePermissions.tsx
 * This component allows the admin to manage the permissions of the users.
 * The admin can change the role of a user to either 'Admin' or 'Regular'.
 * The admin can search for a user by their username.
 * The admin can view the user's avatar, username, email, and role.
 * The admin can change the role of a user by selecting a new role from a dropdown menu.
 * 
 */
import  { useState, useEffect } from 'react';
import {fetchWithAuth} from '../utils/fetchWithAuth';


interface User {
    _id: string;
    avatar: string;
    email: string;
    username: string;
    role: string;
}

export default function ManagePermissions() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newRole, setNewRole] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const managerEmail = import.meta.env.VITE_MANAGEREMAIL

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchWithAuth('/server/user/userspermission', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (!response.ok) {
                    setError(data.message || 'Failed to fetch users');
                    setLoading(false);
                    return;
                }
                const filteredUsers = data.filter((user: User) => user.email !== managerEmail);
                setUsers(filteredUsers);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle role change
    const handleRoleChange = async () => {
        if (!selectedUser || !newRole) return;
        try {
            const response = await fetchWithAuth(`/server/user/updaterole/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Failed to update role');
                return;
            }

            // Update the role locally
            setUsers(users.map(user => user._id === selectedUser._id ? { ...user, role: newRole } : user));
            setShowConfirm(false);
        } catch (err) {
            setError('Failed to update role');
        }
    };
    // This function is called when the admin selects a new role for a user
    const handleChangeRole = (user: User, role: string) => {
        setSelectedUser(user);
        setNewRole(role);
        setShowConfirm(true);
    };
    // This function is called when the admin confirms the role change
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-20" dir='rtl'>
            <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">ניהול משתמשים</h1>

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חפש לפי שם משתמש"
                    className="w-64 px-3 py-1 border rounded-lg focus:outline-none focus:ring focus:border-indigo-300 text-right"
                />
            </div>

            {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <div key={user._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full border-4 border-indigo-200" />
                                    <div className="mr-4">
                                        <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className={`px-3 py-1 rounded-full text-sm ${user.role === 'Admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {user.role === 'Admin' ? 'מנהל' : 'משתמש רגיל'}
                                    </span>
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleChangeRole(user, e.target.value)}
                                        className="block w-34 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="Regular">משתמש רגיל</option>
                                        <option value="Admin">מנהל</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-xl">אין משתמשים תואמים את החיפוש</p>
            )}

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
                        <p className="mb-6 text-lg">
                            האם אתה בטוח שברצונך לשנות את התפקיד של <span className="font-semibold">{selectedUser?.username}</span> ל{newRole === 'Admin' ? 'מנהל' : 'משתמש רגיל'}?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <div className="flex space-x-4">
                                <button onClick={handleRoleChange} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 mr-4">
                                    אשר
                                </button>
                                <button onClick={() => setShowConfirm(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-300">
                                    בטל
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
