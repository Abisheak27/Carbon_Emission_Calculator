import { Fragment, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles";
import StatCards from "./shared/StatCards";
import StatCards2 from "./shared/StatCards2";
import DoughnutChart from "./shared/Doughnut";
import LineChart from "./shared/LineChart";
import ComparisonChart from "./shared/ComparisonChart";
import FuelEmissionsChart from "./shared/FuelEmissionsChart";
import ElectricityChart from "./shared/ElectricityChart";
import CO2Gauge from "./shared/CO2Gauge";
import AQIMap from "./shared/AQIMap";
import { fetchDashboardData } from "./shared/dataService";
import { Button } from "@mui/material";
import { downloadReport } from "./shared/ReportGenerator";

// STYLED COMPONENTS
const ContentBox = styled("div")(({ theme }) => ({
  margin: "2rem",
  [theme.breakpoints.down("sm")]: { margin: "1rem" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

export default function Analytics() {
  const { palette } = useTheme();
  const [dashboardData, setDashboardData] = useState({
    fuelData: [],
    electricityData: [],
    co2Value: 0,
    aqiData: []
  });

  // Fetch data at regular intervals
  useEffect(() => {
    // Initial data fetch
    fetchDashboardData().then(setDashboardData);

    // Set up interval for data updates
    const interval = setInterval(() => {
      fetchDashboardData().then(setDashboardData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <ContentBox id="report-content" className="analytics">
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <StatCards />

            {/* Fuel-Based Emissions Trend */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Title>Fuel-Based Emissions Trend</Title>
              <SubTitle>CO₂ emissions from fuel usage over time</SubTitle>
              <FuelEmissionsChart data={dashboardData.fuelData} />
            </Card>

            {/* Electricity Consumption vs. Emissions */}
            <Card sx={{ p: 3, mb: 3 }}>
              <Title>Electricity Consumption vs. Emissions</Title>
              <SubTitle>Usage and corresponding CO₂ emissions</SubTitle>
              <ElectricityChart data={dashboardData.electricityData} />
            </Card>

            {/* Original Carbon Emission Line Chart */}
            <Grid container spacing={52}>
              <Grid item md={6} xs={12}>
                <Card sx={{ p: 3, mb: 3, height: "350px", width: "580px" }}>
                  <LineChart height="100%" width="100%" />
                </Card>
              </Grid>
              <Grid item md={6} xs={12}>
                <Card sx={{ p: 3, mb: 3, height: "350px", width: "590px" }}>
                  <ComparisonChart height="100%" width="100%" />
                </Card>
              </Grid>
            </Grid>

            <StatCards2 />
          </Grid>

          <Grid item md={4} xs={12}>
            {/* Overall Carbon Emission Doughnut */}
            <Card sx={{ p: 2, mb: 3 }}>
              <Title>Overall Carbon Emission</Title>
              <SubTitle>Last 30 days</SubTitle>
              <DoughnutChart
                height="240px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            {/* Real-Time CO₂ Concentration Gauge */}
            <Card sx={{ p: 2, mb: 3 }}>
              <Title>Real-Time CO₂ Concentration</Title>
              <SubTitle>MQ-135 Sensor Reading (ppm)</SubTitle>
              <CO2Gauge value={dashboardData.co2Value} />
            </Card>

            {/* Air Quality Index (AQI) Map */}
            <Card sx={{ p: 2, mb: 3 }}>
              <Title>Air Quality Index (AQI) Map</Title>
              <SubTitle>CO₂, NOx, and PM2.5 levels across locations</SubTitle>
              <AQIMap data={dashboardData.aqiData} />
            </Card>
          </Grid>
        </Grid>
      </ContentBox>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: -8, // Margin top
          ml: 65,
          mb: 2, // Margin left
          width: "200px", // Set the button width
          height: "60px" // Set the button height
        }}
        onClick={downloadReport}
        >
        Save and Download Report
      </Button>
    </Fragment>
  );
}
