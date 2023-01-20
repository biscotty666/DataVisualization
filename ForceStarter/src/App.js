// import { useEffect, useState, } from "react";
import "./App.css";
import { forceSimulation, forceManyBody, forceLink, forceCenter, select } from 'd3'

const App = () => {
  const nodes = [
    { "id": "Alice" },
    { "id": "Bob" },
    { "id": "Carol" }
  ];

  const links = [
    { source: 0, target: 1 },
    { source: 1, target: 2 }
  ];

  const svg = select('#container')

  const width = +svg.attr('width')
  const height = +svg.attr('height')

  const centerX = width / 2
  const centerY = height / 2

  const simulation = forceSimulation(nodes)
    .force("charge", forceManyBody())
    .force("link", forceLink(links))
    .force("center", forceCenter(centerX, centerY));

  const circles = svg
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10)

  const lines = svg
    .selectAll('line')
    .data(links)
    .enter()
    .append('line')
    .attr('stroke', 'black')


  simulation.on('tick', () => {
    circles
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y)
    lines
      .attr('x1', link => link.source.x)
      .attr('y1', link => link.source.y)
      .attr('x2', link => link.target.x)
      .attr('y2', link => link.target.y)

  })



  return (
    <></>
    // <svg id="container" width="960" height="500">

    // </svg>
  )

}

export default App;
