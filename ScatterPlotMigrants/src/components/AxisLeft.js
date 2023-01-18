export const AxisLeft = ({yScale, innerWidth, tickOffset = 3}) =>       
yScale.ticks().map((tickValue, index) => (
  <g key={index} className="tick" transform={`translate(0,${yScale(tickValue)})`}>
  <line x2={innerWidth} stroke="black" />
  {yScale.tickFormat()(tickValue) ? <text
    style={{textAnchor: 'end'}} 
    x={-tickOffset} 
    dy='.32em' 
  >
    {tickValue}
  </text>:null}
  </g>
))
