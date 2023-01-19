import { axisLeft, select } from "d3"
import { useEffect } from "react"
import { useRef } from "react"

export const YAxis = ({ yScale, innerWidth }) => {
  const ref = useRef()
  useEffect(() => {
    const yAxisG = select(ref.current)
    const yAxis = axisLeft(yScale)
                  .tickSize(-innerWidth)
                  .tickPadding(3)
    yAxisG.call(yAxis)
  }, [yScale, innerWidth])
  return <g ref={ref} />
}