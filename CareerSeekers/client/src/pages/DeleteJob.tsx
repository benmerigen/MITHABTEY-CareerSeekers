/**
 * DeleteJob Component
 * 
 * This component allows an admin to search for a job by name and delete it from the database.
 * It fetches the list of all jobs from the server and filters the jobs dynamically based on the search input.
 * It also provides functionality to delete a specific job, updating the list of jobs in real-time upon successful deletion.
 */

import { useState, useEffect } from "react";
import { FaTrash } from 'react-icons/fa';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function DeleteJob() {
    // State to hold all jobs and filtered jobs for the search functionality
    const [jobs, setJobs] = useState<any[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    
    // State for search query and any error messages
    const [searchQuery, setSearchQuery] = useState('');
    const [err, setError] = useState('');

    /**
     * useEffect to fetch all job names from the server when the component mounts.
     * It makes an authenticated request to the server to get the list of jobs.
     */
    useEffect(() => {
        fetchWithAuth('/server/job/getalljobnames')
            .then(response => response.json())
            .then(data => {
                setJobs(data.jobs); // Set jobs in state
                setFilteredJobs(data.jobs); // Set filtered jobs initially to all jobs
            })
            .catch(() => {
                setError('Error fetching data'); // Handle error in fetching
            });
    }, []);

    /**
     * useEffect to filter jobs based on the search query.
     * Whenever the search query or jobs list changes, the jobs are filtered dynamically.
     */
    useEffect(() => {
        setFilteredJobs(
            jobs.filter(job =>
                job.jobName.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive match
            )
        );
    }, [searchQuery, jobs]);

    /**
     * handleDelete - Function to delete a job by ID.
     * It sends a DELETE request to the server and updates the job lists on successful deletion.
     *
     * @param jobId - The unique identifier of the job to delete
     */
    const handleDelete = (jobId: string) => {
        fetch(`/server/job/deletejob/${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Filter out the deleted job from both jobs and filtered jobs
                    setJobs(jobs.filter((job: any) => job._id !== jobId));
                    setFilteredJobs(filteredJobs.filter((job: any) => job._id !== jobId));
                } else {
                    setError('Error deleting job'); // Error message if deletion fails
                }
            })
            .catch(() => {
                setError('Error deleting job'); // Error message on fetch failure
            });
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-6 text-center">מחיקת מקצוע</h1>
            {/* Display error message if there is any */}
            {err && <p className="text-red-500 text-center mb-4">{err}</p>}

            {/* Search bar to filter jobs by name */}
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חפש לפי שם מקצוע"
                    className="w-64 px-3 py-1 border rounded-lg focus:outline-none focus:ring focus:border-indigo-300 text-right"
                />
            </div>

            {/* Display filtered jobs or a message if no jobs match */}
            <div className="flex flex-col items-center">
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Map over filtered jobs to display them with a delete button */}
                        {filteredJobs.map((job: any) => (
                            <div key={job._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center w-full max-w-xs">
                                <span className="text-lg font-semibold">{job.jobName}</span>
                                <button
                                    onClick={() => handleDelete(job._id)} // Trigger deletion on click
                                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Show this message if no jobs match the search query
                    <p className="text-center text-gray-500 text-xl">אין מקצועות תואמים את החיפוש</p>
                )}
            </div>
        </div>
    );
}
