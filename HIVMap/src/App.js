import "./App.css";
import { interpolateYlOrRd, scaleSequential, max } from 'd3';
import { useWorldAtlas } from '../src/components/useWorldAtlas';
import { useData } from '../src/components/useData';
import { useCodes } from "./components/useCodes";
import { Marks } from '../src/components/Marks';

const width = 960;
const height = 500;
const selectedYear = '2017'

const App = () => {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const codes = useCodes()

  if (!worldAtlas || !data || !codes) {
    return <pre>Loading...</pre>;
  }

  const numericCodeByAlphaCode = new Map()

  codes.forEach(code => {
    const alpha3Code = code["alpha-3"]
    const numericCode = code["country-code"]
    numericCodeByAlphaCode.set(alpha3Code, numericCode)
  })


  const filteredData = data.filter(d => d.Year === selectedYear)

  const rowByNumericCode = new Map()

  filteredData.forEach(d => {
    const alpha3Code = d.Code
    const numericCode = numericCodeByAlphaCode.get(alpha3Code)
    rowByNumericCode.set(numericCode, d)
  })

  console.log(rowByNumericCode)
  
  const colorValue = d => d.aids;

  const colorScale = scaleSequential(interpolateYlOrRd)
    .domain([0, max(data, colorValue)])
  
  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        rowByNumericCode={rowByNumericCode}
        colorScale={colorScale}
        colorValue={colorValue}
      />
    </svg>
  );
};

export default App;
