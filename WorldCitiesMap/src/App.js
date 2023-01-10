import "./App.css";
import { scaleSqrt, max  } from "d3";
import { useWorldAtlas } from "./components/useWorldAtlas";
import { useCities } from "./components/useCities";
import { Marks } from "./components/Marks";


const width = 960;
const height = 500;

const App = () => {
  const worldAtlas = useWorldAtlas();
  const cities = useCities()

  if (!worldAtlas || !cities) {
    return <pre>Loading...</pre>;
  }

  const sizeValue = d => d.population
  const maxRadius = 15
  console.log(sizeValue)
  
  const sizeScale = scaleSqrt()
  .domain([0, max(cities, sizeValue)])
  .range([0, maxRadius])

  
  return (
    <svg width={width} height={height}>
        <Marks 
          worldAtlas={worldAtlas} 
          cities={cities}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
    </svg>
  );
};


export default App;
