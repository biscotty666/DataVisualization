import { extent, line, max, scaleLog, scaleTime } from "d3"
import { XAxis } from "./XAxis"
import { YAxis } from "./YAxis"
import { useCallback } from "react"
import { VoronoiOverlay } from "./VoronoiOverlay"

const xValue = (d) => d.date
const yValue = (d) => d.deathTotal

const margin = { top: 40, right: 40, bottom: 80, left: 70 }

export const LineChart = ({ data, width, height }) => {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  console.log(innerHeight,innerWidth)

  const allData = data.reduce(
    (accumulator, countryTimeseries ) => accumulator.concat(countryTimeseries), 
    []
  )

  const epsilon = 1

  const xScale = scaleTime()
    .domain(extent(allData, xValue))
    .range([0, innerWidth])

  const yScale = scaleLog()
    .domain([epsilon, max(allData, yValue)])
    .range([innerHeight, 0])

  // console.log(max(allData))

  const lineGenerator = line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(epsilon + yValue(d)))

  const handleVoronoiHover = useCallback(() => {
    console.log('Hovered')
  },[])

  return <svg width={width} height={height}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <XAxis xScale={xScale} innerHeight={innerHeight} />
      <YAxis yScale={yScale} innerWidth={innerWidth} />
      {
        data.map(countryTimeseries => {
          // const strokeColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255} )`
          return (
            <path d={lineGenerator(countryTimeseries)} />
          )
        })
      }
      <text 
        transform={`translate(${innerWidth / 2},0)`}
        text-anchor="middle"  
      >
        Coronavirus Global Deaths Over Time
      </text>
      <text 
        className="axis-label"
        transform={`translate(-40,${innerHeight / 2}) rotate(-90)`} 
        text-anchor="middle"
      >
        Cumulative Deaths
      </text>
      <text 
        className="axis-label"
        transform={`translate(${innerWidth / 2},${innerHeight + 40})`} 
        text-anchor="middle"
        alignment-baseline="hanging"
      >
        Time
      </text>
      <VoronoiOverlay 
        onHover={handleVoronoiHover} 
        innerHeight={innerHeight}
        innerWidth={innerWidth}
        allData={allData}
        lineGenerator={lineGenerator}
        epsilon={epsilon}
      />
    </g>
  </svg>
}
