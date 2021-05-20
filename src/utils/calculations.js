import * as d3 from "d3";
import {LegendLinear} from "@visx/legend";
import {AreaClosed} from "@visx/shape";
import {LinearGradient} from "@visx/gradient";
import {
    elementOrEmpty,
    jsons2arrays,
    getHeaderValue,
    isJsons,
    jsonsHeaders,
    jsons2csv,
    arrays2csv
} from "react-csv/src/core";

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
            <rect x={legendPositionScale(props.position) - 1} y={28} width={2} height={26} fill="white"/>
        </>
        }
    </svg>
)

export const joiner = (data) => {
    return data
        .filter(e => e)
        .map(
            row => row
                .map((element) => elementOrEmpty(element))
                .map(column => `"${column}"`)
                .join(',')
        )
        .join(`\n`);
};

export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const buildURI = (data) => {
    const csv = arrays2csv(data.slice(1), data[0],',', '"')
    console.log(csv)
    const type = isSafari() ? 'application/csv' : 'text/csv';
    const blob = new Blob([csv], {type});
    const dataURI = `data:${type};charset=utf-8,${csv}`;

    const URL = window.URL || window.webkitURL;

    return (typeof URL.createObjectURL === 'undefined')
        ? dataURI
        : URL.createObjectURL(blob);
}
