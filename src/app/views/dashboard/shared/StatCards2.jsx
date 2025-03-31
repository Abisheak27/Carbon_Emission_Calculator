import { Card, CardContent, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function StatCards2() {
  const [logs, setLogs] = useState([
    { time: "12:45 PM", co2: "180ppm", alert: "Danger! High Emission" },
    { time: "12:44 PM", co2: "160ppm", alert: "" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        time: new Date().toLocaleTimeString(),
        co2: `${Math.floor(Math.random() * 100) + 100}ppm`, // Random CO₂ between 100-200ppm
        alert: Math.random() > 0.7 ? "Danger! High Emission" : "" // 30% chance of alert
      };

      setLogs((prevLogs) => [...prevLogs, newLog].slice(-5)); // Keep last 5 logs
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Grid container spacing={51} sx={{ mb: 3 }}>
      {/* Recent Logs */}
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ px: 4, py: 3, mb: 5, height: "350px", width: "575px" }}>
          <CardContent>
            <Typography variant="h6" align="center">
              Recent Logs
            </Typography>
            {logs.map((log, index) => (
              <Card key={index} sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5" }}>
                <Typography variant="body1">
                  {log.time} - CO₂: {log.co2}
                </Typography>
              </Card>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Alerts */}
      <Grid item xs={12} md={6}>
        <Card elevation={3} sx={{ px: 4, py: 3, mb: 5, height: "350px", width: "600px" }}>
          <CardContent>
            <Typography variant="h6" align="center">
              Alerts 🚨
            </Typography>
            {logs.map((log, index) =>
              log.alert ? (
                <Card key={index} sx={{ mt: 2, p: 2, backgroundColor: "#ffebee" }}>
                  <Typography variant="body1" color="error">
                    {log.alert}
                  </Typography>
                </Card>
              ) : null
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
