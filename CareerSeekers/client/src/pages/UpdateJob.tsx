/**
 * EditJob Component
 * 
 * This component allows users to edit job details. It includes functionality to search for jobs, select a job to edit, and update the job details.
 * It handles fetching job data, searching through jobs, selecting a job, and submitting updates.
 * 
 * @returns JSX.Element - The rendered edit job component.
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import JobForm from '../components/jobs/jobForm';
import { fetchWithAuth } from '../utils/fetchWithAuth';


export default function EditJob() {
    // Hook to programmatically navigate
    const navigate = useNavigate();

    // State to manage jobs data, filtered jobs, selected job, initial data for the form, search text, and no results found
    const [jobs, setJobs] = useState<any[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [initialData, setInitialData] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [noResults, setNoResults] = useState<boolean>(false);

    /**
     * Fetch all job data on component mount and initialize filtered jobs.
     */
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/server/job/getalljobnames');
                const data = await response.json();
                setJobs(data.jobs);
                setFilteredJobs(data.jobs);
            } catch (err) {
                toast.error('Failed to fetch jobs.');
            }
        };
        fetchJobs();
    }, []);

    /**
     * Fetch job data when a job is selected.
     */
    useEffect(() => {
        if (selectedJob !== null) {
            fetchWithAuth(`/server/job/jobData/${selectedJob}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    setInitialData(data);
                })
                .catch(() => {
                    toast.error('Failed to fetch job.');
                });
        }
    }, [selectedJob]);

    /**
     * Handle search input changes and filter jobs based on the search text.
     * 
     * @param e - Event object from the input field change
     */
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = jobs.filter(job => job.jobName.toLowerCase().includes(value));
        setFilteredJobs(filtered);
        setNoResults(filtered.length === 0);
    };

    /**
     * Handle job selection and set the selected job ID.
     * 
     * @param jobId - The ID of the selected job
     */
    const handleJobSelect = (jobId: string) => {
        setSelectedJob(jobId);
    };

    /**
     * Handle form submission to update job details.
     * 
     * @param formData - The form data to be submitted
     */
    const handleSubmit = async (formData: any) => {
        try {
            const response = await fetchWithAuth(`/server/job/updatejob/${selectedJob}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('המקצוע התעדכן בהצלחה!', {
                    position: 'top-center',
                    autoClose: 2000,
                    onClose: () => navigate('/adminpanel')
                });
            } else {
                toast.error(data.message || 'Failed to update job.');
            }
        } catch (err) {
            toast.error('Failed to update job. Please try again.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 p-4 mt-20" dir='rtl'>
            <ToastContainer />
            <div className="md:w-2/5 mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <h1 className="text-2xl font-bold text-center py-2 bg-slate-700 text-white">עידכון פרטי מקצוע</h1>
                
                {jobs.length > 0 ? (
                    <div>
                        <label htmlFor="job-search" className="block text-center my-4">הקלד\י מקצוע מבוקש</label>
                        <input
                            id="job-search"
                            type="text"
                            className="block mx-auto mb-4 p-2 border rounded w-3/4"
                            placeholder="הקלד\י שם המקצוע"
                            value={searchText}
                            onChange={handleSearch}
                        />

                        {noResults && (
                            <p className="text-red-500 text-center mb-4">לא נמצאו תוצאות תואמות לחיפוש</p>
                        )}

                        <label htmlFor="job-select" className="block text-center my-4">בחר מקצוע מכלל המקצועות:</label>
                        <select
                            id="job-select"
                            className="block mx-auto mb-4 p-2 border rounded w-3/4"
                            onChange={(e) => handleJobSelect(e.target.value)}
                            value={selectedJob || ''}
                        >
                            <option value="" disabled>בחר מקצוע לעדכן</option>
                            {filteredJobs.map(job => (
                                <option key={job._id} value={job._id}>
                                    {job.jobName}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <p>Loading jobs...</p>
                )}

                {initialData ? (
                    <JobForm key={initialData._id} initialData={initialData} onSubmit={handleSubmit} isEditMode={true} />
                ) : null}
            </div>
        </div>
    );
}
