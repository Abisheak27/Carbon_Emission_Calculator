import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { calculateCO2FromFuel } from "../shared/dataService";

const FuelEmissionsChart = ({ data = [] }) => {
  const { palette } = useTheme();

  // Custom tooltip formatter
  const tooltipFormatter = (value, name) => {
    return [
      `${calculateCO2FromFuel(value, name)} kg CO₂ (${value} units)`,
      name.charAt(0).toUpperCase() + name.slice(1)
    ];
  };

  return (
    <Box height="350px" mt={2}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis label={{ value: "CO₂ Emissions (kg)", angle: -90, position: "insideLeft" }} />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
          <Bar dataKey="diesel" fill={palette.primary.main} name="diesel" />
          <Bar dataKey="naturalGas" fill={palette.secondary.main} name="naturalGas" />
          <Bar dataKey="petrol" fill={palette.error.main} name="petrol" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default FuelEmissionsChart;
