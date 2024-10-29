/**
 * Component to display a table of jobs with sorting functionality
 * This component receives an array of Job objects and a callback function to handle row clicks
 * It displays the job data in a table with sortable headers
 */
import React, { useState } from 'react';
import linkImage from '../../assets/link.png';  
import { jobFields } from './jobFieldMapping';  

// Type definition for a Job object
type Job = {
    _id: string;  // Unique identifier for the job
    jobName: string;  // Name of the job
    Description: string;  // Description of the job
    AverageSalary: number;  // Average salary for the job
    jobField: string;  // Field/category of the job
    facebookPostUrl?: string;  // Optional URL for a Facebook post related to the job
    Prerequisites: { [key: string]: number };  // Prerequisites for the job
};

// Type definition for component props
type Props = {
    jobs: Job[];  // Array of Job objects to display in the table
    onJobClick: (job: Job) => void;  // Callback function to handle job row clicks
};

// Functional React component to display a table of jobs
const JobTable: React.FC<Props> = ({ jobs, onJobClick }) => {
    // State for sorting the table, initially sorted by jobName in ascending order
    const [sortBy, setSortBy] = useState<{ key: keyof Job; order: 'asc' | 'desc' }>({
        key: 'jobName',
        order: 'asc',
    });

    // Function to handle sorting by a specific key
    const handleSort = (key: keyof Job) => {
        setSortBy((prev) => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
        }));
    };

    // Sort the jobs based on the current sortBy state
    const sortedData = [...jobs].sort((a, b) => {
        const order = sortBy.order === 'asc' ? 1 : -1;
        const aValue = a[sortBy.key]?.toString() || '';
        const bValue = b[sortBy.key]?.toString() || '';
        return order * aValue.localeCompare(bValue);
    });

    return (
        <div className="w-full my-3">
            <div className="overflow-x-auto">
                <table className="max-h-96 w-full table-auto border-collapse border border-gray-200 block">
                    <thead>
                        <tr className="bg-gray-100">
                            {/* Header cells with sorting functionality */}
                            <SortableHeader
                                label="שם מקצוע"
                                sortBy={sortBy}
                                onClick={() => handleSort('jobName')}
                                widthClass="w-1/4"
                            />
                            <SortableHeader
                                label="תיאור"
                                sortBy={sortBy}
                                onClick={() => handleSort('Description')}
                                widthClass="w-1/2"
                            />
                            <SortableHeader
                                label="שכר ממוצע"
                                sortBy={sortBy}
                                onClick={() => handleSort('AverageSalary')}
                                widthClass="w-1/6"
                            />
                            <SortableHeader
                                label="תחום מקצוע"
                                sortBy={sortBy}
                                onClick={() => handleSort('jobField')}
                                widthClass="w-1/6"
                            />
                            <th className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6">
                               קישור לפוסט בפייסבוק
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                        {sortedData.map((job) => (
                            <tr key={job._id} onClick={() => onJobClick(job)}>
                                {/* Table cells displaying job data */}
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/4">{job.jobName}</td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/2">{job.Description}</td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6">{job.AverageSalary}</td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6">
                                    {jobFields[job.jobField]?.hebrew || job.jobField}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 cursor-pointer w-1/6 text-center">
                                    {job.facebookPostUrl ? (
                                        <a href={job.facebookPostUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={linkImage} alt="Link" className="inline w-5 h-5" />
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Functional component for sortable table headers
const SortableHeader = ({
    label,
    sortBy,
    onClick,
    widthClass,
}: {
    label: string;  // Header label text
    sortBy: { key: keyof Job; order: 'asc' | 'desc' };  // Current sorting state
    onClick: () => void;  // Click handler for sorting
    widthClass?: string;  // Optional class for width
}) => {
    return (
        <th
            onClick={onClick}
            className={`border border-gray-300 px-4 py-2 cursor-pointer ${widthClass}`}
        >
            {label} {sortBy.key === label.toLowerCase() && (sortBy.order === 'asc' ? '↑' : '↓')}
        </th>
    );
};

export default JobTable;
