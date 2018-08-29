import React from "react";
import Plot from "react-plotly.js";

const LineGraph = ({ appData }) => {
  const data = [
    {
      x: appData.labels && appData.labels.length > 0 ? appData.labels : null,
      y: appData.data,
      type: "scatter",
      mode: "line"
    }
  ];

  const layout = {
    xaxis: {
      showticklabels: (appData.labels && appData.labels.length > 0) || false,
      type: "category"
    }
  };
  return (
    <Plot data={data} layout={layout} config={{ displayModeBar: false }} />
  );
};

export default LineGraph;
