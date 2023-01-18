import "./App.css";
import { scaleSqrt, max } from 'd3';
import { useWorldAtlas } from '../src/components/useWorldAtlas';
import { useData } from '../src/components/useData';
import { Marks } from '../src/components/Marks';

const width = 960;
const height = 500;

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = d => d['Total Dead and Missing'];
  const maxRadius = 15;

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);
  
  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        data={data}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
};

export default App;
