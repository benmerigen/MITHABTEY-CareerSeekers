/**
 * PrerequisitesChart.tsx
 * This component is used to display a doughnut chart of job prerequisites.
 * It receives the data for the chart and the job name as props.
 * The chart displays the percentage of each prerequisite for the job.
 * The chart uses Chart.js library for rendering.
 */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { jobFields } from './jobFieldMapping'; // Import jobFields for Hebrew labels

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

// Define colors for each prerequisite
const colors: { [key: string]: string } = {
    'Business': 'rgba(117,169,255,0.6)',
    'Outdoor': 'rgba(208,129,222,0.6)',
    'Technology': 'rgba(148,223,215,0.6)',
    'General Culture': 'rgba(247,127,167,0.6)', // Updated with space
    'Science': 'rgba(255,206,86,0.6)',
    'Organization': 'rgba(75,192,192,0.6)',
    'Service': 'rgba(153,102,255,0.6)',
    'Arts And Entertainment': 'rgba(255,159,64,0.6)', // Updated with space
};

interface DonutChartProps {
    data: { labels: string[], counts: number[] };
    jobName: string; // New prop for job name
}

const PrerequisitesChart: React.FC<DonutChartProps> = ({ data, jobName }) => {
    // Map the colors to the labels dynamically
    const backgroundColors = data.labels.map(label => {
        const formattedLabel = label.replace(/([A-Z])/g, ' $1').trim(); // Add spaces before capital letters
        return colors[formattedLabel] || 'rgba(0,0,0,0.1)'; // Get the corresponding color or fallback
    });

    // Map the labels to Hebrew using jobFields
    const mappedLabels = data.labels.map(label => {
        const formattedLabel = label.replace(/([A-Z])/g, ' $1').trim(); // Add spaces before capital letters
        return jobFields[formattedLabel]?.hebrew || formattedLabel; // Get Hebrew labels
    });

    const chartData = {
        labels: mappedLabels, // Use the mapped Hebrew labels
        datasets: [
            {
                data: data.counts,
                backgroundColor: backgroundColors,
            }
        ]
    };

    const options = {
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 700, 
                },
                formatter: (value: number) => {
                    // Don't show the label if the value is zero
                    if (value === 0) {
                        return null; 
                    }
                    return ` ${value}%`;
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        let label = context.label || '';
                        if (label) {
                            const count = context.raw;
                            return `${label}: ${count}%`;
                        }
                        return '';
                    }
                }
            },
            legend: {
                display: false,
                position: 'bottom' as const
            },
            title: {
                display: true,
                text: `דרישות עבור ${jobName}`,
                font: {
                    size: 15
                }
            }
        }
    };

    return (
        <div>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default PrerequisitesChart;
