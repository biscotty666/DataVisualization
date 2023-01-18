// import { useEffect, useState, } from "react";
// import { format } from "d3";
import "./App.css";
import { useData } from "./components/useData";
import { LineChart } from "./components/LineChart";

const width = window.innerWidth
const height = window.innerHeight
console.log(width, height)

const App = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  return (
    <LineChart data={data} width={width} height={height}/>
  )

}

export default App;
