import React, { Component } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default class BarChar extends Component {
  options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Distribution",
      },
    },
  };
  data = {
    labels: this.props.chartdata.labels,
    datasets: [
      {
        label: this.props.chartdata.label,
        data: this.props.chartdata.dataset,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  render() {
    return <Bar options={this.options} data={this.data} />;
  }
}