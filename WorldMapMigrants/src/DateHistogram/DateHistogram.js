import {
  max,
  sum,
  timeMonths,
  scaleLinear,
  timeFormat,
  extent,
  scaleTime,
  bin,
  brushX,
  select,
} from "d3";
import { useRef, useEffect, useMemo } from "react";
import { HistMarks } from "./HistMarks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const margin = { top: 0, right: 30, bottom: 20, left: 50 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%d/%m/%Y")

const xAxisLabel = 'Time';

const yValue = d => d['Total Dead and Missing'];
const yAxisLabel = 'Total Dead and Missing';


export const DateHistogram = ({ data, width, height, setBrushExtent, xValue }) => {
  const brushRef = useRef()

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  const xScale = useMemo(() => scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice(), [data, xValue, innerWidth])



  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain()
    return bin()
      .value(xValue)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))
      (data)
      .map(array => ({
        y: sum(array, yValue),
        x0: array.x0,
        x1: array.x1
      }))}, [xScale, data, yValue, xValue])

  const yScale = useMemo(() => scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])
    .nice(), [binnedData, innerHeight])

  useEffect(() => {
    const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]])
    brush(select(brushRef.current))
    brush.on('brush end', (event) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert))
    })
  }, [innerWidth, innerHeight])

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
        <g ref={brushRef} />
      </g>
    </>
  )
}