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
    <svg width={400} height={100}>
        <LinearGradient id="gradient" from={red} to={blue} vertical={false}/>
        <rect x={10} y={30} width={380} height={24} fill="url('#gradient')"/>
        <text x={10} y={75} textAnchor={"start"} fill={"white"}>Rep</text>
        <rect x={199} y={30} width={2} height={24} textAnchor={"middle"} fill={"black"}>0</rect>
        <text x={390} y={75} textAnchor={"end"} fill={"white"}>Dem</text>
        {props.position !== null &&
        <>
            <text x={legendPositionScale(props.position)} y={20} fill={"white"} textAnchor={"middle"}>
                    {Math.abs(props.position).toFixed(4)}
            </text>
            <rect x={legendPositionScale(props.position)-1} y={28} width={2} height={26} fill="white"/>
        </>
        }
    </svg>
)
