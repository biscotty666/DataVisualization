export const Marks = ({
  data, 
  yScale, 
  xScale, 
  xValue, 
  yValue, 
  tooltipFormat, 
  circleRadius = 10
}) =>         
data.map((d,i) => 
  <circle 
    className="mark"
    key={i} 
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))} 
    r={circleRadius}
  >
    <title>{tooltipFormat(xValue(d))}</title>
  </circle>

)
