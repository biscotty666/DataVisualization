import { axisBottom, select } from "d3"
import { useEffect } from "react"
import { useRef } from "react"

export const XAxis = ({ xScale, innerHeight }) => {
  const ref = useRef()
  useEffect(() => {
    const xAxisG = select(ref.current)
    const xAxis = axisBottom(xScale)
                  .tickSize(-innerHeight)
                  .tickPadding(18)
    xAxisG.call(xAxis)
  }, [xScale, innerHeight])
  return <g transform={`translate(0, ${innerHeight})`} ref={ref} />
}