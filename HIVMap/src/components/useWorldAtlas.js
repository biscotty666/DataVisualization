import { useEffect, useState } from "react"
import { json } from "d3"
import { feature, mesh } from 'topojson'

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

export const useWorldAtlas = () => {
  const [data, setData] = useState()

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { countries, land } = topology.objects
      setData({
        countries: feature(topology, countries),
        interiors: mesh(topology, countries, (a,b) => a !== b)})
    })    
  }, [])
  return data
}