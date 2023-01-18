import { extent, line, max, scaleLinear, scaleTime } from "d3"

const xValue = d => d.date
const yValue = d => d.deathTotal

export const LineChart = ({data, width, height}) => {

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, width])

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([height, 0])

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))

  return <svg  width={width} height={height}>
    <path d={lineGenerator(data)} />
  </svg>
}
