import { useState, useCallback } from "react";
import "./App.css";
import { Face } from "./components/Face";


const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const App = () => {
  return (

    <Face width={width} height={height}
      centerX={centerX} centerY={centerY}
      strokeWidth={20}
      eyeOffsetX={90} 
      eyeOffsetY={100} 
      eyeRadius={40}
      mouthWidth={20} 
      mouthRadius={140}
    />
  )
}

export default App;
