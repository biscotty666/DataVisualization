import { max, sum, timeMonths, scaleLinear, timeFormat, extent, scaleTime, bin } from "d3";
import { HistMarks } from "./HistMarks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
const margin = { top: 0, right: 30, bottom: 20, left: 50 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;


export const DateHistogram = ({ data, width, height }) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xValue = d => d['Reported Date'];
  const xAxisLabel = 'Time';

  const yValue = d => d['Total Dead and Missing'];
  const yAxisLabel = 'Total Dead and Missing';

  const xAxisTickFormat = timeFormat("%d/%m/%Y")

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();


  const [start, stop] = xScale.domain()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))
    (data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }))

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])
    .nice()

  return (
    <>
      <rect width={width} height={height} fill='white' />
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${innerHeight /
            2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={7} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>

        <HistMarks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          tooltipFormat={xAxisTickFormat}
          innerHeight={innerHeight}
        />
      </g>
    </>
  )
}