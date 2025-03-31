import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";

export default function LineChart({ height, color = [] }) {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Initial labels
    series1: [30, 40, 20, 50, 40, 80, 90],
    series2: [20, 50, 15, 50, 30, 70, 95]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newLabel = new Date().toLocaleTimeString(); // New X-Axis Label (Time)
        const newSeries1Value = Math.floor(Math.random() * 100);
        const newSeries2Value = Math.floor(Math.random() * 100);

        // Update Data, Keeping Only Last 10 Points
        const updatedLabels = [...prevData.labels, newLabel].slice(-10);
        const updatedSeries1 = [...prevData.series1, newSeries1Value].slice(-10);
        const updatedSeries2 = [...prevData.series2, newSeries2Value].slice(-10);

        return {
          labels: updatedLabels,
          series1: updatedSeries1,
          series2: updatedSeries2
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const option = {
    grid: { top: "15%", bottom: "15%", left: "8%", right: "8%" },
    legend: {
      itemGap: 20,
      icon: "circle",
      textStyle: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.typography.fontFamily
      }
    },
    xAxis: {
      type: "category",
      data: chartData.labels, // Dynamic X-axis Labels
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: "roboto",
        color: theme.palette.text.secondary
      }
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        fontFamily: "roboto"
      }
    },
    series: [
      {
        data: chartData.series1, // Live Data for "This Month"
        type: "line",
        stack: "Carbon",
        name: "Carbon",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      },
      {
        data: chartData.series2, // Live Data for "Last Month"
        type: "line",
        stack: "Nitrogen",
        name: "Nitrogen",
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 }
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height || "400px" }}
      option={{ ...option, color: color.length ? [...color] : ["#ff0000", "#0000ff"] }}
    />
  );
}
