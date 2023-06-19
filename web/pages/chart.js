import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['User', 'Buyer'],
        datasets: [
          {
            label: 'Value',
            data: [10, 20],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            borderRadius: 20, // Mengatur sudut lengkung pada chart bar
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
            },
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;
