/**
 * Component to render a pie chart of job field counts
 * This component uses Chart.js library to render the chart
 * 
 */

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { jobFields } from './jobFieldMapping';

// Interface representing the data structure for the chart
interface ChartData {
    labels: string[];  // Array of labels for chart segments
    counts: number[];  // Array of counts corresponding to each label
}

// Interface for component props
interface JobFieldChartProps {
    data: ChartData;  // Data to be displayed in the chart
}

// Functional React component to render a pie chart of job field counts
const JobsFieldCountChart: React.FC<JobFieldChartProps> = ({ data }) => {
    // Reference to the canvas element where the chart will be rendered
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Check if the chart reference is set
        if (chartRef.current) {
            // Map the labels to their corresponding background colors from the jobFields mapping
            const backgroundColors = data.labels.map(label => jobFields[label]?.color || 'rgba(0,0,0,0.1)');
            
            // Map the labels to their corresponding Hebrew names from the jobFields mapping
            const hebrewLabels = data.labels.map(label => jobFields[label]?.hebrew || label);

            // Create a new Chart instance
            const chartInstance = new Chart(chartRef.current, {
                type: 'pie',  // Type of chart
                data: {
                    labels: hebrewLabels,  // Labels for the chart segments
                    datasets: [
                        {
                            data: data.counts,  // Data values for each segment
                            backgroundColor: backgroundColors,  // Background colors for each segment
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,  // Hide the legend
                            position: 'bottom',
                        },
                        title: {
                            display: true,  // Display the chart title
                            text: 'כמות מקצועות בכל תחום',  // Title text in Hebrew
                            font: {
                                size: 15,  // Font size for the title
                            },
                        },
                        datalabels: {
                            color: '#fff',  // Color of the data labels
                            font: {
                                weight: 'bold',  // Font weight of the data labels
                            },
                            formatter: (value: number) => {
                                return value === 0 ? null : `${value}`;  // Format data labels to show the value or hide if 0
                            },
                        },
                    },
                },
                plugins: [ChartDataLabels],  // Register the ChartDataLabels plugin
            });

            // Cleanup function to destroy the chart instance on component unmount
            return () => {
                chartInstance.destroy();
            };
        }
    }, [data]);  // Effect dependency on data to re-render the chart when data changes

    return <canvas ref={chartRef} />;  // Render the canvas element for the chart
};

export default JobsFieldCountChart;
