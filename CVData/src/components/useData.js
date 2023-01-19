import { useEffect, useState } from "react"
import { csv, timeParse } from "d3"


// const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/02be34e5ec0409835f79f61a547b2b42f2c6dfd7/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'

const csvUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'

// const sum = (accumulator, currentValue) => accumulator + currentValue

const parseDay = timeParse('%m/%d/%y')


const transform = rawData => {

  const countriesData = rawData.filter(d => !d['Province/State'])


  const days = rawData.columns.slice(4)

  return countriesData.map(d => {
    // const countryName = d['Country/Region']
    // console.log(countryName)
    return days.map(day => ({
      date: parseDay(day),
      deathTotal: +d[day]
  }))

  })    

}

export const useData = () => {
  const [data, setData] = useState()
  console.log(data)
  useEffect(() => {
    csv(csvUrl).then(rawData => {
      setData(transform(rawData))
    })    
  }, [])
  return data
}