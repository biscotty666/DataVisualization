import { Delaunay } from "d3-delaunay"

console.log(Delaunay)

export const VoronoiOverlay = ({ 
    innerWidth, 
    innerHeight, 
    allData,
    lineGenerator,
  }) => {
  const points = allData.map(d => [lineGenerator.x()(d),lineGenerator.y()(d)])
  const delaunay = Delaunay.from(points)
  const voronoi = delaunay.voronoi([0, 0, innerWidth, innerHeight])
  // console.log(allData)
  return <g className="voronoi">
    {points.map((point, i) => (
      <path fill='none' stroke='pink' d={voronoi.renderCell(i)} />
    ))}
  </g>

}