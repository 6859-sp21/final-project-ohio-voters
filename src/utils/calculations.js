import * as d3 from "d3";

const colorScale = d3.scaleLinear()
    .domain([-1, 1])
    .range(["#ec4747", "#4e65e9"])

export const getLocalityColor = value => colorScale(value)
