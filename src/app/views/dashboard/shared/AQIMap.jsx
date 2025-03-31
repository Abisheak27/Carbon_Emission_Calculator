import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getAQIColor } from "../shared/dataService";

const AQIMap = ({ data = [] }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {data.map((location, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            p: 1,
            borderRadius: 1,
            backgroundColor: getAQIColor(location.aqi),
            color: location.aqi < 100 ? "rgba(0,0,0,0.87)" : "white"
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {location.location} - AQI: {location.aqi}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="body2">CO₂: {location.co2} ppm</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">NOx: {location.nox} ppm</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">PM2.5: {location.pm25} μg/m³</Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default AQIMap;
