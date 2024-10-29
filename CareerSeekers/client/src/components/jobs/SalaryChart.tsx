/**
 * SalaryChart.tsx
 * This component is used to display a bar chart of average salary for job fields.
 * It receives the data for the chart as props.
 * The chart uses Chart.js library for rendering.
 * 
 */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { jobFields } from './jobFieldMapping';

// Type definition for chart data
interface ChartData {
    labels: string[];  // Labels for the chart (e.g., job fields)
    counts: number[];  // Data points corresponding to the labels (e.g., average salaries)
}

// Type definition for component props
interface SalaryChartProps {
    data: ChartData;  // Data to be displayed in the chart
}

// Functional React component to display a bar chart of average salaries
const SalaryChart: React.FC<SalaryChartProps> = ({ data }) => {
    // Reference to the canvas element where the chart will be rendered
    const chartRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Filter out data points where counts are 0
            const filteredData = {
                labels: data.labels.filter((_, index) => data.counts[index] !== 0),
                counts: data.counts.filter(count => count !== 0),
            };

            // Translate labels to Hebrew if a translation exists
            const hebrewLabels = filteredData.labels.map(label => jobFields[label]?.hebrew || label);

            // Create a new chart instance
            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',  // Chart type
                data: {
                    labels: hebrewLabels,
                    datasets: [
                        {
                            data: filteredData.counts,
                            backgroundColor: 'rgba(50,127,167,0.6)',  // Background color of the bars
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,  // Hide legend
                        },
                        title: {
                            display: true,
                            text: 'ממוצע שכר עבור תחום',  // Chart title in Hebrew
                            font: {
                                size: 15,
                            },
                        },
                        datalabels: {
                            color: '#fff',  // Color of the data labels
                            font: {
                                weight: 'bold',  // Font weight of the data labels
                            },
                            formatter: (value: number) => {
                                return value === 0 ? null : new Intl.NumberFormat().format(value);  // Format data labels
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'תחום מקצוע',  // X-axis title in Hebrew
                                font: {
                                    weight: 'bold',  // Font weight of the X-axis title
                                },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'שכר ממוצע',  // Y-axis title in Hebrew
                                font: {
                                    weight: 'bold',  // Font weight of the Y-axis title
                                },
                            },
                        },
                    },
                },
                plugins: [ChartDataLabels],  // Include the data labels plugin
            });

            // Cleanup function to destroy the chart instance when the component is unmounted
            return () => {
                chartInstance.destroy();
            };
        }
    }, [data]);

    return <canvas ref={chartRef} />;  // Render the chart within a canvas element
};

export default SalaryChart;
