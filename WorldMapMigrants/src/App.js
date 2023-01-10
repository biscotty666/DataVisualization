import "./App.css";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./WorldAtlas/useData";
import { BubbleMap } from "./WorldAtlas/BubbleMap";
import { DateHistogram } from "./DateHistogram/DateHistogram";
import { useState } from "react";

const width = 960;
const height = 500;
const dateHistogramSize = 0.3
const xValue = d => d['Reported Date'];

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData()
  const [brushExtent, setBrushExtent] = useState()

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent ? data.filter(d => {
    const date = xValue(d)
    return date > brushExtent[0] && date < brushExtent[1]
  }) : data

  console.log(filteredData)

  return (
    <>
    <h1>Migrants Dead and Missing</h1>
    <svg width={width} height={height}>
        <BubbleMap data={data} filteredData={filteredData} worldAtlas={worldAtlas} />
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram 
            data={data} 
            width={width} 
            height={dateHistogramSize * height} 
            setBrushExtent={setBrushExtent}
            xValue={xValue}
          />
        </g>
    </svg>
    </>
  );
};


export default App;
