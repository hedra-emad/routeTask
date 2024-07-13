import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface Data {
    day: string;
    amount: number;
}

interface ChartsProps {
    data: Data[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
    if(data == undefined)return;
    const colors = [
        '#28a745', // Green
        '#dc3545', // Red
        '#000000', // Black
        '#aeaaaa'  // Light gray
    ];

    const borderColors = [
        '#28a745', // Green
        '#dc3545', // Red
        '#000000', // Black
        '#aeaaaa'  // Light gray
    ];

    const chartData = {
        labels: data.map(item => item.day),
        datasets: [
            {
                label: `Transaction per day`,
                data: data.map(item => item.amount),
                backgroundColor: data.map((_, index) => colors[index % colors.length]),
                borderColor: data.map((_, index) => borderColors[index % borderColors.length]),
                borderWidth: 1,
                borderRadius: 5, 
                barThickness: 30, 
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container" style={{"margin":"auto","marginTop":"100px","width":"50%","display":"flex","justifyContent":"space-between","alignItems":"center"}}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default Charts;