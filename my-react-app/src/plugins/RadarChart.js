import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import Color from 'color';
import { RadarController, RadialLinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, CategoryScale, Title, Tooltip, Legend);

const RadarChart = ({ jsonData }) => {
  const labels = Object.keys(jsonData);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const Utils = {
    CHART_COLORS: {
      red: 'rgb(255, 99, 132)',
      blue: 'rgb(54, 162, 235)',
    },
    transparentize: (color, opacity) => {
      const alpha = opacity === undefined ? 0.5 : 1 - opacity;
      return Color(color).alpha(alpha).rgb().string();
    },
  };

  useEffect(() => {
    const values = Object.values(jsonData);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Your Dataset',
          data: values,
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        },
      ],
    };

    const config = {
      type: 'radar',
      data: data,
      options: {
        responsive: true,
        scales: {
          r: {
            min: 1,
            max: 10,
          },
        },
        plugins: {
          title: {
            display: true,
            text: '',
          },
        },
      },
    };

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
    </div>
  );
};

export default RadarChart;
