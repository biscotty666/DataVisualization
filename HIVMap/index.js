// import React from "react"
// import { ReactDOM } from "react";

const App = () => (
  <h1>Hello JSX</h1>
)

const rootElement = document.getElementById('root')
console.log("Hello")
ReactDOM.render(<App />, rootElement)