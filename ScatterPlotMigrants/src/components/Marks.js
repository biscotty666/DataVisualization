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
