import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function StatCards2() {
  const logs = [
    { time: "12:45 PM", co2: "180ppm", alert: "Danger! High Emission" },
    { time: "12:44 PM", co2: "160ppm", alert: "" }
  ];

  return (
    <Grid container spacing={51} sx={{ mb: 3 }}>
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
  