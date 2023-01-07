import { useState, useCallback } from "react";
import "./App.css";
// import { Face } from "./components/Face";

const width = 960
const height = 500
const circleRadius = 30
const initialMousePosition = { x: width / 2, y: height / 2 }


const App = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition)
  const handleMouseMove = useCallback(event => {
    const { clientX, clientY } = event
    setMousePosition({ x: clientX, y: clientY })
  }, [setMousePosition])
  
  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle
        cx={mousePosition.x}
        cy={mousePosition.y}
        r={circleRadius}
      />
    </svg>
  )

// const App = () => (
// return (

//   <Face width={width} height={height} onMouseMove={handleMouseMove}
//     centerX={mousePosition.x} centerY={mousePosition.y}
//     strokeWidth={20}
//     eyeOffsetX={90} 
//     eyeOffsetY={100} 
//     eyeRadius={40}
//     mouthWidth={20} 
//     mouthRadius={140}
//   />
// )
}

export default App;
