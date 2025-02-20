import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Store from "@mui/icons-material/Store";
import Group from "@mui/icons-material/Group";
import AttachMoney from "@mui/icons-material/AttachMoney";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Small } from "app/components/Typography";

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "50px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "18px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

// Function to determine color based on gas level
const getCircleColor = (name, value) => {
  if (name === "CO2 Level") {
    return value > 200 ? "red" : value > 100 ? "yellow" : "green";
  }
  if (name === "CH4 Level") {
    return value > 2.0 ? "red" : value > 1.5 ? "yellow" : "green";
  }
  if (name === "NOX Level") {
    return value > 1.0 ? "red" : value > 0.5 ? "yellow" : "green";
  }
  return "gray"; // Default color
};

export default function StatCards() {
  const cardList = [
    { name: "CO2 Level", amount: 180, unit: "PPM", Icon: Group },
    { name: "CH4 Level", amount: 1.8, unit: "%", Icon: AttachMoney },
    { name: "NOX Level", amount: 0.8, unit: "%", Icon: Store }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, unit, Icon, name }) => (
        <Grid item md={6} xs={12} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" />

              <Box ml="15 px">
                <Small>{name}</Small>
                <Heading>
                  {amount} {unit}
                </Heading>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: getCircleColor(name, amount),
                    marginTop: "8px"
                  }}
                />
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <ArrowRightAlt />
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
