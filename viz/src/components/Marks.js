import { line, curveNatural } from "d3"

export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius = 10
}) => (
  <g className="marks">
    <path 
      fill="none"
      stroke="black"
      d={line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveNatural)(data)}
     />
    {data.map((d, i) =>
      <circle
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    )}
  </g> 
)
