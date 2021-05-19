import * as d3 from "d3";

const colorScale = d3.scaleLinear()
    .domain([-1, 1])
    .range(["#ff3a3a", "#2462ff"])

export const getLocalityColor = value => colorScale(value)
