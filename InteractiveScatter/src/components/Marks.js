export const Marks = ({
  data, 
  yScale, 
  xScale,
  colorScale, 
  xValue, 
  yValue,
  colorValue,
  tooltipFormat, 
  circleRadius = 10
}) =>         
data.map((d,i) => 
  <circle 
    className="mark"
    key={i} 
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))}
    fill={colorScale(colorValue(d))}
    r={circleRadius}
  >
    <title>{tooltipFormat(xValue(d))}</title>
  </circle>

)
