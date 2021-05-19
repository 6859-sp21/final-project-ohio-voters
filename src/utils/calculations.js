import * as d3 from "d3";
import {LegendLinear} from "@visx/legend";
import {AreaClosed} from "@visx/shape";
import {LinearGradient} from "@visx/gradient";

const red = "#ff3a3a"
const blue = "#2462ff"

const colorScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([red, blue])

const legendPositionScale = d3.scaleLinear()
    .domain([-1, 1])
    .range([110, 490]) // offset by 2 for width of rectangle

export const getLocalityColor = value => colorScale(value)

export const LocalityColorLegend = props => (
    <svg width={500} height={100}>
        <LinearGradient id="gradient" from={red} to={blue} vertical={false}/>
        <rect x={110} y={30} width={380} height={24} fill="url('#gradient')"/>
        <text x={10} y={46} fill={"white"}>Party Skew</text>
        <text x={110} y={75} textAnchor={"middle"} fill={"white"}>-1</text>
        <text x={300} y={75} textAnchor={"middle"} fill={"white"}>0</text>
        <text x={490} y={75} textAnchor={"middle"} fill={"white"}>1</text>
        {props.position &&
        <>
            <text x={legendPositionScale(props.position)} y={20} fill={"white"} textAnchor={"middle"}>
                    {props.position.toFixed(4)}
            </text>
            <rect x={legendPositionScale(props.position)-1} y={28} width={2} height={26} fill="white"/>
        </>
        }
    </svg>
)
