import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { getCO2Level } from "../shared/dataService";

const GaugeContainer = styled("div")({
  position: "relative",
  textAlign: "center",
  height: "200px"
});

const GaugeValue = styled("div")({
  position: "absolute",
  bottom: "20px",
  width: "100%",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold"
});

const CO2Gauge = ({ value = 0 }) => {
  // Color based on value
  const getColor = (co2Value) => {
    if (co2Value < 50) return "#4caf50"; // Good
    if (co2Value < 100) return "#ff9800"; // Moderate
    return "#f44336"; // Unhealthy
  };

  // Format data for the chart
  const data = [{ name: "CO₂", value }];

  return (
    <GaugeContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 200]} />
          <YAxis dataKey="name" type="category" />
          <Bar dataKey="value" fill={getColor(value)} />
        </BarChart>
      </ResponsiveContainer>
      <GaugeValue>
        {value} ppm
        <Typography variant="body2" color="textSecondary">
          {getCO2Level(value)}
        </Typography>
      </GaugeValue>
    </GaugeContainer>
  );
};

export default CO2Gauge;
