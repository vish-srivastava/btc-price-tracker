import React from "react";
import { Line,ResponsiveLine } from "@nivo/line";
import "./Graph.css";

const Graph = ({ data, minimaDate, maximaDate }) => {
console.log("Graph component data:", data);
  console.log("Graph component minimaDate:", minimaDate);
  console.log("Graph component maximaDate:", maximaDate);
  const formattedData = Object.entries(data).map(([date, value]) => ({
    x: new Date(date), // Convert date to a Date object
    y: value,
  }));
  
  // Calculate min and max x and y values
  let minXValue = Infinity;
  let maxXValue = -Infinity;
  let minYValue = Infinity;
  let maxYValue = -Infinity;
  
  formattedData.forEach(({ x, y }) => {
    if (x < minXValue) {
      minXValue = x;
    }
    if (x > maxXValue) {
      maxXValue = x;
    }
    if (y < minYValue) {
      minYValue = y;
    }
    if (y > maxYValue) {
      maxYValue = y;
    }
  });

  const highlightedRange = [
    { x: minimaDate, y: 0 },
    { x: maximaDate, y: 1 },
  ];

  const graphData = [
    {
      id: "Bitcoin Value",
      data: formattedData,
    },
  ];

 const graphSettings = {
  margin: { top: 50, right: 50, bottom: 50, left: 50 },
  xScale: { type: "time", format: "%Y-%m-%d" },
  yScale: { type: "linear", min: minYValue, max: maxYValue }, // Use minDate and maxDate
  axisBottom: { format: "%b %d" },
  axisLeft: { tickValues: 5 },
  enableGridX: false,
  enableGridY: true,
  colors: ["rgba(75, 192, 192, 0.7)"],
  legends: [
    {
      anchor: "top-left",
      direction: "column",
      translateX: -50,
      translateY: -40,
    },
  ],
  markers: highlightedRange
    ? highlightedRange.map((point, index) => ({
        axis: "x",
        value: point.x,
        lineStyle: { stroke: "red", strokeWidth: 2 },
        legend: `${index + 1}`,
      }))
    : [],
};

  

  return (
    <div className="graph">
      <ResponsiveLine data={graphData} {...graphSettings} />
    </div>
  );
};

export default Graph;
