// Mock data generator functions
const generateFuelEmissionsData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const currentMonth = new Date().getMonth();

  return months.slice(0, currentMonth + 1).map((month) => ({
    month,
    diesel: Math.floor(Math.random() * 300) + 100,
    naturalGas: Math.floor(Math.random() * 200) + 50,
    petrol: Math.floor(Math.random() * 150) + 50
  }));
};

const generateElectricityData = () => {
  return Array(12)
    .fill()
    .map((_, i) => ({
      day: i + 1,
      consumption: Math.floor(Math.random() * 100) + 50,
      emissions: Math.floor(Math.random() * 80) + 40
    }));
};

const generateCO2GaugeData = () => {
  return Math.floor(Math.random() * 150) + 30;
};

const generateAQIMapData = () => {
  const locations = ["Mine A", "Mine B", "Mine C", "Mine D", "Mine E"];
  return locations.map((location) => ({
    location,
    co2: Math.floor(Math.random() * 100) + 40,
    nox: Math.floor(Math.random() * 50) + 10,
    pm25: Math.floor(Math.random() * 30) + 5,
    aqi: Math.floor(Math.random() * 150) + 50
  }));
};

// In a real application, this would fetch from an API
export const fetchDashboardData = async () => {
  // Simulate API request with a small delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // For a real implementation:
  // const response = await fetch('/api/emission-data');
  // return response.json();

  return {
    fuelData: generateFuelEmissionsData(),
    electricityData: generateElectricityData(),
    co2Value: generateCO2GaugeData(),
    aqiData: generateAQIMapData()
  };
};

// Utility functions that can be used across components
export const calculateCO2FromFuel = (fuel, type) => {
  const factors = {
    diesel: 2.64, // 1 liter = 2.64 kg CO2
    naturalGas: 2.7, // 1 kg = 2.7 kg CO2
    petrol: 2.3 // 1 liter = 2.3 kg CO2
  };

  return Math.round(fuel * factors[type]);
};

export const getCO2Level = (value) => {
  if (value < 50) return "Good";
  if (value < 100) return "Moderate";
  if (value < 150) return "Unhealthy for Sensitive Groups";
  return "Unhealthy";
};

export const getAQIColor = (aqi) => {
  if (aqi < 50) return "#00e676";
  if (aqi < 100) return "#ffeb3b";
  if (aqi < 150) return "#ff9800";
  return "#f44336";
};
