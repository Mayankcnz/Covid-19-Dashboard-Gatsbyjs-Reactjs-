import React from "react";
import { Doughnut } from "react-chartjs-2";
import { fetchContinent } from "../../api";

const PieChart = (props) => {
  let pieData = null;
  let pieOptions = null;

  if (props.data.length !== 0) {
    pieData = {
      labels: ["NA", "EU", "AS", "SA", "OCE", "AF"],
      datasets: [
        {
          data: [
            parseInt(props.data[0]),
            parseInt(props.data[1]),
            parseInt(props.data[2]),
            parseInt(props.data[3]),
            parseInt(props.data[4]),
            parseInt(props.data[5]),
          ], // Specify the data values array

          borderColor: ["#2196f38c", "#f443368c", "#3f51b570", "#00968896"], // Add custom color border
          backgroundColor: ["#2196f38c", "#f443368c", "#3f51b570", "#00968896"], // Add custom color background (Points and Fill)
          borderWidth: 1, // Specify bar border width
        },
      ],
    };

    pieOptions = {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: "white",
        },
      },
    };
  }
  return (
    <div>
      <Doughnut data={pieData !== null ? pieData : {}} options={pieOptions} />
    </div>
  );
};

export default PieChart;
