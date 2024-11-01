import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsGraph = () => {
  // eslint-disable-next-line no-unused-vars
  const { organicUsers, referralUsers } = useSelector(
    (state) => state.analytics
  );


  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], 
    datasets: [
      {
        label: "Organic Users",
        data: [10, 20, 30, 40],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Referral Users",
        data: [5, 15, 25, 35], 
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        pointBackgroundColor: "rgba(153, 102, 255, 1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12 },
          color: "black",
        },
      },
      title: {
        display: true,
        text: "Organic vs Referral Users Over Time",
        font: { size: 16 },
        color: "black",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: "black" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "black" },
      },
    },
  };

  return (
    <div className="chart-container w-full h-64 sm:h-72 md:h-76 lg:h-[28rem] mt-4 px-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default AnalyticsGraph;
