import React, { useEffect, useRef } from 'react';
import TreeChart from "d3-org-chart";

interface OrgNode {
    id: number;
    name: string;
    parentId?: number;
}

interface OrgChartComponentProps {
    data: OrgNode[] | null;
    onNodeClick: any
}

const OrgChartComponent: React.FC<OrgChartComponentProps> = ({ data, onNodeClick }) => {
    const chartRef = useRef<HTMLDivElement>(null); // Use a ref to reference the DOM element
    const chartInstance = useRef<any>(null); // Ref to hold the TreeChart instance

    useEffect(() => {
        if (!data) return; // Don't proceed if data is not available

        // Initialize the TreeChart instance if it hasn't been created yet
        if (!chartInstance.current) {
            chartInstance.current = new TreeChart();
        }

        // Set up and render the chart
        chartInstance.current
            .container(chartRef.current) // Attach the chart to the DOM element
            .data(data) // Pass the data to the chart
            .svgWidth(500) // Set the SVG width
            .initialZoom(0.6) // Set the initial zoom level
            .onNodeClick((d: any) => {
                onNodeClick(d);
                // console.log(d);
            }) // Handle node click events
            .render(); // Render the chart
    }, [data]); // Re-run this effect when `data` changes

    return <div ref={chartRef} />; // Render the container for the chart
};

export default OrgChartComponent;
