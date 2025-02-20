import { Fragment } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import { styled, useTheme } from "@mui/material/styles";


import StatCards from "./shared/StatCards";
import StatCards2 from "./shared/StatCards2";
import DoughnutChart from "./shared/Doughnut";
import LineChart from "./shared/LineChart";
import ComparisonChart from "./shared/ComparisonChart";

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

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "1rem",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

export default function Analytics() {
  const { palette } = useTheme();

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={6} justifyContent="center">
        <Grid size={{ md: 8, xs: 17 }}>
          <StatCards />
        <Grid container spacing={51}>
          <Grid size={{ md: 6, xs: 12 }}>
            <Card sx={{ px: 3, py: 3, mb: 5, height: "350px", width:"575px" }}>
                <LineChart height="100%" width="100%" />               {" "}
            </Card>  
          </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Card sx={{ px: 4, py: 3, mb: 5, height: "350px",width:"600px" }}>
            <ComparisonChart height="100%" width="100%" />               {" "}
          </Card>
        </Grid>
        </Grid>
        <StatCards2 />
        </Grid>
        <Grid size={{ md: 4, xs: 12 }}>
        <Card sx={{ px: 2, py: 1, mb: 3 }}>
         <Title>Overall Carbon Emission</Title>             {" "}
         <SubTitle>Last 30 days</SubTitle>
         <DoughnutChart
                height="240px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
         </Card>
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
}
