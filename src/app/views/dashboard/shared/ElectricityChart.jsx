import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const ElectricityChart = ({ data = [] }) => {
  const { palette } = useTheme();

  return (
    <Box height="350px" mt={2}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="day"
            label={{ value: "Day of Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis yAxisId="left" label={{ value: "kWh", angle: -90, position: "insideLeft" }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "CO₂ (kg)", angle: 90, position: "insideRight" }}
          />
          <Tooltip />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="consumption"
            fill={palette.info.light}
            stroke={palette.info.main}
            name="Electricity (kWh)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="emissions"
            fill={palette.warning.light}
            stroke={palette.warning.main}
            name="CO₂ Emissions (kg)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ElectricityChart;
