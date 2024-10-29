/*
* GeneralProfessions.tsx - Component for displaying general professions based on user's selected requirements.
* This component fetches job data from the server and displays job cards with match percentage and missing requirements.
* The user can select general requirements using react-select and view detailed information about each job.
*/
import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { FaArrowLeft, FaBriefcase, FaUsers, FaPalette, FaFlask, FaClipboardList, FaHandHoldingHeart, FaTree, FaLaptopCode } from 'react-icons/fa'; 
import { fetchWithAuth } from '../utils/fetchWithAuth';

// Define the Job interface to type-check job data
interface Job {
    id: string;
    jobName: string;
    Description: string;
    AverageSalary: number;
    jobField: string;
    facebookPostUrl?: string;
    GeneralRequirements: string[];
    standardDay: string;
    education: string;
    technicalSkills: string;
    workLifeBalance: string;
}

// Define the OptionType for react-select
interface OptionType {
    value: string;
    label: string;
}

// Icon mapping based on jobField
const jobFieldIcons: { [key: string]: React.ReactNode } = {
    Business: <FaBriefcase />,
    'General Culture': <FaUsers />,
    'Arts And Entertainment': <FaPalette />,
    Science: <FaFlask />,
    Organization: <FaClipboardList />,
    Service: <FaHandHoldingHeart />,
    Outdoor: <FaTree />,
    Technology: <FaLaptopCode />,
};

// GeneralProfessions Component
const GeneralProfessions: React.FC = () => {
    // State variables
    const [jobs, setJobs] = useState<Job[]>([]); // Jobs data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]); // Selected requirements
    const [uniqueRequirements, setUniqueRequirements] = useState<OptionType[]>([]); // Unique requirements for select input
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // Index of active job card

    useEffect(() => {
        // Fetch job data from the server
        const fetchAllJobs = async () => {
            try {
                const res = await fetchWithAuth('/server/job/getAllJobs');
                const result = await res.json();

                // Validate data format
                if (!Array.isArray(result.data)) {
                    throw new Error('Invalid data format');
                }

                // Process job data
                const jobsData = result.data.map((job: { GeneralRequirements: any; }) => ({
                    ...job,
                    GeneralRequirements: job.GeneralRequirements || []
                }));

                setJobs(jobsData);

                // Extract unique requirements for the select input
                const requirements: string[] = jobsData.reduce((acc: string[], job: Job) => {
                    job.GeneralRequirements.forEach(req => {
                        if (!acc.includes(req)) {
                            acc.push(req);
                        }
                    });
                    return acc;
                }, []);
                setUniqueRequirements(requirements.map(req => ({ value: req, label: req })));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('לא הצלחנו להוריד את המשרות');
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, []);

    /**
     * handleSelectChange - Updates selectedRequirements state based on user's selection.
     *
     * @param selectedOptions - Array of selected options from react-select
     */
    const handleSelectChange = (selectedOptions: MultiValue<OptionType>) => {
        setSelectedRequirements(selectedOptions ? selectedOptions.map(opt => opt.value) : []);
    };

    /**
     * calculateMatchPercentage - Calculates the percentage of matched requirements.
     *
     * @param jobRequirements - Array of requirements for a job
     * @returns Percentage of matched requirements
     */
    const calculateMatchPercentage = (jobRequirements: string[]): number => {
        if (jobRequirements.length === 0) return 0;

        const matchCount = jobRequirements.filter(req => selectedRequirements.includes(req)).length;

        return (matchCount / jobRequirements.length) * 100;
    };

    // Filter and sort jobs based on match percentage
    const filteredJobs = jobs
        .filter(job => {
            const matchPercentage = calculateMatchPercentage(job.GeneralRequirements);
            return matchPercentage > 0; // Exclude jobs with 0% match
        })
        .sort((a, b) => calculateMatchPercentage(b.GeneralRequirements) - calculateMatchPercentage(a.GeneralRequirements));

    if (loading) return <p className="text-center">טוען...</p>; // Display loading message
    if (error) return <p className="text-center text-red-500">{error}</p>; // Display error message

    return (
        <div className="container mx-auto p-0 mt-24" dir="rtl"> 
            <h1 className="text-2xl font-bold mb-4 text-center">חיפוש מקצוע מהמאגר על פי תכונות אופי</h1>
            
            {/* React-Select component for selecting general requirements */}
            <Select
                isMulti
                options={uniqueRequirements}
                onChange={handleSelectChange}
                placeholder="בחר דרישות כלליות"
                className="mb-4 sm:w-1/2 mx-auto min-[320px]:w-3/4"
            />

            {/* Job cards */}
            <div className="mx-auto sm:w-5/6 min-[320px]:w-auto grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
                {filteredJobs.map((job, index) => {
                    const matchPercentage = calculateMatchPercentage(job.GeneralRequirements);
                    const missingRequirements = job.GeneralRequirements.filter(req => !selectedRequirements.includes(req));
                    const isActive = activeIndex === index;

                    // Fixed height for non-active cards
                    const heightClass = isActive ? 'h-auto' : 'h-42';

                    return (
                        <div
                            key={job.id}
                            className={`bg-white p-4 shadow-md rounded-md cursor-pointer transition transform hover:scale-105 ${heightClass}`}
                            onClick={() => setActiveIndex(isActive ? null : index)}
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold mb-2 flex items-center">
                                    {/* Display the icon next to the jobField */}
                                    {jobFieldIcons[job.jobField]} <span className="ml-2 mx-2">{job.jobName}</span>
                                </h2>
                                <p className="text-gray-800">
                                    {Number.isInteger(matchPercentage) ? matchPercentage.toFixed(0) : matchPercentage.toFixed(2)}% התאמה
                                </p>
                                <FaArrowLeft
                                    className={`w-6 h-6 transform transition-transform ${isActive ? '-rotate-90' : ''}`}
                                />
                            </div>

                            <hr />
                            {!isActive && (
                                <div className="mt-2">
                                    <p>
                                        <strong>דרישות: </strong>
                                        {job.GeneralRequirements.map((req, idx) => (
                                            <span
                                                key={req}
                                                className={`${selectedRequirements.includes(req) ? 'text-green-600' : 'text-red-600'} mr-2`}
                                            >
                                                {req}{idx < job.GeneralRequirements.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            )}
                            {isActive && (
                                <div className="mt-2">
                                    <p><strong>תיאור: </strong> {job.Description}</p>
                                    <p><strong>שכר ממוצע: </strong> ${job.AverageSalary}</p>
                                    <p><strong>תחום מקצועי: </strong> {job.jobField}</p>
                                    <p><strong>איך נראה יום עבודה סטנדרטי</strong> {job.standardDay}</p>
                                    <p><strong>האם נדרש תואר: </strong> {job.education}</p>
                                    <p><strong>האם נדרש יכולת טכנית: </strong> {job.technicalSkills}</p>
                                    <p><strong>איזון בין עבודה לחיים: </strong> {job.workLifeBalance}</p>
                                    {job.facebookPostUrl && (
                                        <p><strong>מידע נוסף בפוסט: </strong>
                                            <a
                                                href={job.facebookPostUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                לינק 
                                            </a>
                                        </p>
                                    )}
                                    <p>
                                        <strong>דרישות חסרות: </strong>
                                        {missingRequirements.length > 0 ? (
                                            <span className="text-red-600">{missingRequirements.join(', ')}</span>
                                        ) : (
                                            'אין דרישות חסרות למקצוע זה.'
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GeneralProfessions;
