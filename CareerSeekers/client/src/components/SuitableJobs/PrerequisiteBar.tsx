/**
 * PrerequisiteBar.tsx
 * This component is used to display a bar chart of job prerequisites.
 * It receives the prerequisites data as props.
 * The chart displays the percentage of each prerequisite for the job.
 * The chart uses Chart.js library for rendering.
 */
import React from 'react';

interface PrerequisiteBarProps {
    prerequisites: { [key: string]: number };
}

const PrerequisiteBar: React.FC<PrerequisiteBarProps> = ({ prerequisites }) => {
    // Filter out prerequisites with zero values
    const filteredPrerequisites = Object.entries(prerequisites).filter(([_, value]) => value > 0);

    // Define colors for each prerequisite
    const colors: { [key: string]: string } = {
        'Business': 'rgba(117,169,255,0.6)',
        'Outdoor': 'rgba(208,129,222,0.6)',
        'Technology': 'rgba(148,223,215,0.6)',
        'GeneralCulture': 'rgba(247,127,167,0.6)',
        'Science': 'rgba(255,206,86,0.6)',
        'Organization': 'rgba(75,192,192,0.6)',
        'Service': 'rgba(153,102,255,0.6)',
        'ArtsAndEntertainment': 'rgba(255,159,64,0.6)',
    };

    return (
        <div dir="rtl"> {/* Set text direction to right-to-left */}
            <p className="mt-2"><strong>תכונות נדרשות למקצוע:</strong></p>
            <div className="relative w-full bg-gray-200 rounded-full h-4 flex mb-2 my-1">
                {filteredPrerequisites.map(([key, value]) => {
                    const color = colors[key] || '#CCCCCC'; // Default color if key is not found
                    return (
                        <div
                            key={key}
                            className="relative h-full"
                            style={{
                                width: `${value}%`,
                                backgroundColor: color,
                            }}
                        >
                            <div className="absolute text-white text-xs mr-1 mt-0 whitespace-nowrap right-0">{`${value}%`}</div> {/* Align percentage text to the right */}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-2">
                {filteredPrerequisites.map(([key, value]) => {
                    const color = colors[key] || '#000000'; // Use matching color for text, default to black if key is not found
                    return (
                        <span key={key} className="text-sm font-bold" style={{ color }}>
                            {`${key}: ${value}%`}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default PrerequisiteBar;
