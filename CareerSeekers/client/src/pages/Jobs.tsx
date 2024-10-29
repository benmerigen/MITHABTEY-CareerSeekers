/**
 * Jobs page
 * This page displays information about jobs, including the number of jobs in each field, the average salary for each field, and the prerequisites for each job.
 * The user can filter the jobs by job field and search for specific jobs.
 * The user can also view the prerequisites for each job by clicking on the job in the table
 * 
 * 
 */

import React, { useState, useEffect } from 'react';
import JobsFieldCountChart from '../components/jobs/JobsFieldCountChart';
import SalaryChart from '../components/jobs/SalaryChart';
import JobTable from '../components/jobs/JobTable';
import PrerequisitesChart from '../components/jobs/PrerequisitesChart';
import Select from 'react-select';
import { fetchWithAuth } from '../utils/fetchWithAuth';

const Jobs: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<{ data: { _id: string, jobName: string, Description: string, AverageSalary: number, jobField: string, Prerequisites: { [key: string]: number }, facebookPostUrl?: string }[] }>({ data: [] });
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(data.data);
    const [jobFieldChartData, setJobFieldChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [salaryChartData, setSalaryChartData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [selectedJobFields, setSelectedJobFields] = useState<{ value: string, label: string }[]>([]);
    const [selectedJob, setSelectedJob] = useState<{ [key: string]: number }>({});
    const [selectedJobName, setSelectedJobName] = useState<string>('');
    const [showPrerequisites, setShowPrerequisites] = useState(false);
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);

    const jobFieldData: { [key: string]: { label: string, color: string } } = {
        'Business': { label: 'עסקים', color: 'rgba(117,169,255,0.6)' },
        'Outdoor': { label: 'עבודה בחוץ', color: 'rgba(208,129,222,0.6)' },
        'Technology': { label: 'טכנולוגיה', color: 'rgba(148,223,215,0.6)' },
        'General Culture': { label: 'תרבות', color: 'rgba(247,127,167,0.6)' },
        'Science': { label: 'מדע', color: 'rgba(255,206,86,0.6)' },
        'Organization': { label: 'אירגון', color: 'rgba(75,192,192,0.6)' },
        'Service': { label: 'מתן שירות', color: 'rgba(153,102,255,0.6)' },
        'Arts And Entertainment': { label: 'אומנות ובידור', color: 'rgba(255,159,64,0.6)' },
    };

    const aggregateDataByJobField = (jobs: { jobField: string }[]) => {
        const aggregatedData: { [key: string]: number } = {};
        jobs.forEach(job => {
            const jobField = job.jobField;
            if (aggregatedData[jobField]) {
                aggregatedData[jobField] += 1;
            } else {
                aggregatedData[jobField] = 1;
            }
        });
        return aggregatedData;
    };

    const aggregateAverageSalaryByJobField = (jobs: { jobField: string, AverageSalary: number }[]) => {
        const salaryData: { [key: string]: { totalSalary: number, count: number } } = {};
        jobs.forEach(job => {
            const jobField = job.jobField;
            if (salaryData[jobField]) {
                salaryData[jobField].totalSalary += job.AverageSalary;
                salaryData[jobField].count += 1;
            } else {
                salaryData[jobField] = { totalSalary: job.AverageSalary, count: 1 };
            }
        });
        const averageSalaryData: { [key: string]: number } = {};
        for (const field in salaryData) {
            averageSalaryData[field] = salaryData[field].totalSalary / salaryData[field].count;
        }
        return averageSalaryData;
    };

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await fetchWithAuth('/server/job/getAllJobs');
                const data = await res.json();
                if (!res.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                setData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError('Failed to fetch jobs');
                setLoading(false);
            }
        };
        fetchAllJobs();
    }, []);

    useEffect(() => {
        const initialJobFields = data.data.slice(0, 8);
        const aggregatedJobFieldData = aggregateDataByJobField(initialJobFields);
        const aggregatedAverageSalaryData = aggregateAverageSalaryByJobField(initialJobFields);

        setOptions(data.data.map(job => job.jobField).filter((value, index, self) => self.indexOf(value) === index).map(label => ({ value: label, label })));

        setJobFieldChartData({
            labels: Object.keys(aggregatedJobFieldData),
            counts: Object.values(aggregatedJobFieldData)
        });

        setSalaryChartData({
            labels: Object.keys(aggregatedAverageSalaryData),
            counts: Object.values(aggregatedAverageSalaryData)
        });

        setFilteredData(data.data);

    }, [data]);

    useEffect(() => {
        if (selectedJobFields.length === 0) {
            // Show all jobs and reset the charts
            const aggregatedJobFieldData = aggregateDataByJobField(data.data);
            const aggregatedAverageSalaryData = aggregateAverageSalaryByJobField(data.data);

            setJobFieldChartData({
                labels: Object.keys(aggregatedJobFieldData),
                counts: Object.values(aggregatedJobFieldData)
            });

            setSalaryChartData({
                labels: Object.keys(aggregatedAverageSalaryData),
                counts: Object.values(aggregatedAverageSalaryData).map(avg => Number(avg.toFixed(0)))
            });

            setFilteredData(data.data);
        } else {
            const selectedFields = selectedJobFields.map(field => field.value);
            const filteredJobs = data.data.filter(job => selectedFields.includes(job.jobField));

            const filteredJobFieldData = aggregateDataByJobField(filteredJobs);
            const filteredAverageSalaryData = aggregateAverageSalaryByJobField(filteredJobs);

            setJobFieldChartData({
                labels: Object.keys(filteredJobFieldData),
                counts: Object.values(filteredJobFieldData)
            });

            setSalaryChartData({
                labels: Object.keys(filteredAverageSalaryData),
                counts: Object.values(filteredAverageSalaryData).map(avg => Number(avg.toFixed(0)))
            });

            setFilteredData(filteredJobs);
        }
    }, [selectedJobFields, data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filtered = data.data.filter(job =>
            job.jobName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            job.Description.toLowerCase().includes(e.target.value.toLowerCase()) ||
            job.AverageSalary.toString().includes(e.target.value) ||
            job.jobField.toLowerCase().includes(e.target.value.toLowerCase()) 
        );
        setFilteredData(filtered);
    };

    const handleJobClick = (job: { Prerequisites: { [key: string]: number }; jobName: string }) => {
        setSelectedJob(job.Prerequisites);
        setSelectedJobName(job.jobName);
        setShowPrerequisites(true);
    };

    const handleJobFieldSelection = (selected: any) => {
        if (selected.length <= 8) {
            setSelectedJobFields(selected);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="space-y-8 m-4" >
            <h1 className="text-2xl font-bold text-center my-4" >Job Information</h1>

            <div className="flex flex-wrap justify-center gap-4">
                <div className="w-full sm:w-1/2 md:w-1/3 p-2" style={{ maxHeight: '300px', maxWidth: '300px' }}>
                    {jobFieldChartData.labels.length > 0 && <JobsFieldCountChart data={jobFieldChartData} />}
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 p-2" style={{ maxHeight: '500px', maxWidth: '500px' }}>
                    {salaryChartData.labels.length > 0 && <SalaryChart data={salaryChartData} />}
                </div>
                <div className="flex items-center justify-center text-center font-bold w-full sm:w-1/2 md:w-1/3 p-2" style={{ maxHeight: '300px', maxWidth: '300px' }}>
                    {showPrerequisites && Object.keys(selectedJob).length > 0 && <PrerequisitesChart data={{ labels: Object.keys(selectedJob), counts: Object.values(selectedJob) }} jobName={selectedJobName} />}
                    {!showPrerequisites && <p>בחר מקצוע מהטבלה על מנת לראות את התכונות הנרדשות עבורו</p>}
                </div>
            </div>

            {/* show the Colors of the job fields */}
            <div className='w-full md:w-5/6 mx-auto text-center'>
                <div className="flex flex-wrap justify-center gap-3">
                    {Object.keys(jobFieldData).map((key) => (
                        <div key={key} className="flex items-center space-x-2">
                                                        <p className="m-0">{jobFieldData[key].label}</p>

                            <div className="w-4 h-4" style={{ backgroundColor: jobFieldData[key].color }}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* show the job fields selection */}
            <div className='w-full md:w-1/2 mx-auto' dir="rtl">
                <div className="flex justify-center">
                    <Select
                        id="jobFields"
                        name="jobFields"
                        placeholder="בחר תחומים להשוואה..."
                        isMulti
                        options={options.map(option => ({ value: option.value, label: jobFieldData[option.value]?.label || option.label }))} // Use new object here
                        className="basic-multi-select text-right w-2/5"
                        classNamePrefix="select"
                        value={selectedJobFields.map(field => ({ value: field.value, label: jobFieldData[field.value]?.label || field.label }))} // Use new object here
                        onChange={handleJobFieldSelection}
                    />
                </div>
            </div>

            {/* show the search bar and the job table */}
            <div className="w-full md:w-2/3 mx-auto" dir="rtl">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="חפש ברשימת המקצועות..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-right"
                />
                <JobTable jobs={filteredData} onJobClick={handleJobClick} />
            </div>
        </div>
    );
};

export default Jobs;
