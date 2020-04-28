import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import { fetchDailyData } from "../../api";

const Chart = (props) => {
  const [dailyData, setDailyData] = useState([]);

  const {
    data: { confirmed, infected, deaths, recovered },
    country,
  } = props;

  useEffect(() => {
    const fetchApi = async () => {
      const initialDailyData = await fetchDailyData();
      setDailyData(initialDailyData);
    };
    fetchApi();
  }, []);

  let data = null;
  let lineOptions = null;
  let barData = null;
  let barOptions = null;

  if (dailyData.length !== 0) {
    data = {
      labels: dailyData.map(({ date }) => date),
      datasets: [
        {
          data: dailyData.map(({ confirmed }) => confirmed),
          label: "Infected",
          borderColor: "#3333ff",
          fill: true,
        },
        {
          data: dailyData.map(({ deaths }) => deaths),
          label: "Deaths",
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
          fill: true,
        },
      ],
    };

    barData = {
      labels: ["Infected", "Recovered", "Deaths"],
      datasets: [
        {
          label: "People",
          backgroundColor: [
            "rgba(0, 0, 255, 0.5)",
            "rgba(0, 255, 0, 0.5)",
            "rgba(255, 0, 0, 0.5)",
          ],
          data: [
            confirmed === undefined ? 0 : confirmed.value,
            confirmed === undefined ? 0 : recovered.value,
            confirmed === undefined ? 0 : deaths.value,
          ],
        },
      ],
    };

    barOptions = {
      legend: { display: false },
      title: {
        display: true,
        text: `Current state in ${country}`,
        fontColor: "white",
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "grey",
            },

            ticks: {
              fontColor: "white",
            },
          },
        ],
        yAxes: [
          {
            // stacked: true,
            gridLines: {
              display: true,
              color: "grey",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "white",
            },
          },
        ],
      },
    };

    lineOptions = {
      legend: {
        display: true,
        labels: {
          fontColor: "white",
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "grey",
            },

            ticks: {
              fontColor: "white",
            },
          },
        ],
        yAxes: [
          {
            // stacked: true,
            gridLines: {
              display: true,
              color: "grey",
            },
            ticks: {
              beginAtZero: true,
              fontColor: "white",
            },
          },
        ],
      },
      tooltips: {
        enabled: false,
      },
    };
  }

  return (
    <div className={styles.container}>
      {country === "" ? (
        <Line data={data !== null ? data : {}} options={lineOptions} />
      ) : (
        <Bar data={barData !== null ? barData : {}} options={barOptions} />
      )}
    </div>
  );
};

export default Chart;
