import React from "react";
import Plot from "react-plotly.js";

const ColumnGraph = ({ appData }) => {
  const data = [
    {
      x:
        appData && appData.labels && appData.labels.length > 0
          ? appData.labels
          : null,
      y: appData && appData.data,
      type: "bar"
    }
  ];

  return <Plot data={data} config={{ displayModeBar: false }} />;
};

export default ColumnGraph;
