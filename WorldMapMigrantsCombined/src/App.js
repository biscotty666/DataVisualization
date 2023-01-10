import "./App.css";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./WorldAtlas/useData";
import { BubbleMap } from "./WorldAtlas/BubbleMap";
import { DateHistogram } from "./DateHistogram/DateHistogram";

const width = 960;
const height = 500;
const dateHistogramSize = 0.3

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData()

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  return (
    <svg width={width} height={height}>
        <BubbleMap data={data} worldAtlas={worldAtlas} />
        <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
          <DateHistogram data={data} width={width} height={dateHistogramSize * height} />
        </g>
    </svg>
  );
};


export default App;
