import { Bar } from "react-chartjs-2";

export default function BarChart({ data, height, width }) {
  const chartData = {
    labels: data.map((item) => item.time),
    datasets: [
      {
        label: "CO₂ Emissions (kg)",
        data: data.map((item) => item.emission),
        backgroundColor: "#FF6384"
      }
    ]
  };

  return <Bar data={chartData} height={height} width={width} />;
}
