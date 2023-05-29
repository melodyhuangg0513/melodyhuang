import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import Color from 'color';
import { LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

//create the chart component
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

//define the line chart module
const LineChart = ({jsonData}) => {

  const chartRef = useRef();
  const chartInstanceRef = useRef();
  // Restructure the JSON object to match the format expected by Chart.js
  const labels = Object.keys(jsonData);
  const values = Object.values(jsonData);

  // Find the minimum and maximum values in the values array
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  //normalize the value in the range of 0-100
  const normalize = (value, min, max) => {
    return (value - min) * 100 / (max - min);
  };
  

  // Normalize the values array
  const normalizedValues = values.map((value) => normalize(value, minValue, maxValue));

  //set the utils for the chart
  const Utils = {
    CHART_COLORS: {
      red: 'rgb(255, 99, 132)',
      blue: 'rgb(54, 162, 235)',
    },
    months: ({ count = 12, section = 3 } = {}) => {
  
      return Array.from({ length: count }, (_, i) => labels[i % 12]);
    },
    numbers: ({ count = 8, min = 0, max = 100 } = {}) =>
      Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min),
    transparentize: (color, opacity) => {
      const alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return Color(color).alpha(alpha).rgb().string();
    },
    namedColor: (index) => {
      const names = Object.keys(Utils.CHART_COLORS);
      return Utils.CHART_COLORS[names[index % names.length]];
    },
    rand: (min, max) => {
      return Math.random() * (max - min) + min;
    },
  };

  useEffect(() => {
    
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Your Dataset',
          data:normalizedValues,
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        },

      ],
    };
    const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: '',
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Time Stamp',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Answer Effectiveness', 
              },
            },
          },
        },
      };
      

    // Create the chart
    if (chartRef && chartRef.current) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = new Chart(chartRef.current, config);
        return () => {
          chartInstanceRef.current.destroy();
        };
      }
      
  }, [jsonData]);


  return (
    <div>
      <canvas ref={chartRef}></canvas>
      <div>
      </div>
    </div>
  );
};

export default LineChart;
