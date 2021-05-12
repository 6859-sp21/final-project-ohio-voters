import React, {Component} from "react";
import {getOhioCities} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class OhioCities extends Component {
    state = {
        ohioCities: null,
        projection: null,
        tooltipContent: ""
    }

    componentDidMount() {
        getOhioCities().then(ohioCities => this.setState({
            ohioCities,
            projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], ohioCities)
        }));
    }

    render() {
        return (
            this.state.ohioCities &&
            <>
                <ComposableMap projection={this.state.projection}
                               data-tip={this.state.tooltipContent}
                               width={500}
                               height={500}
                               style={{border: "solid 1px black", borderRadius: 4, margin: 10}}>
                    <Geographies geography={this.state.ohioCities}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       fill="#aaa"
                                       stroke="black"
                                       onMouseEnter={() => this.setState({
                                           tooltipContent: `<p>${geography.properties.NAME}</p>`,
                                       })}
                                       onMouseLeave={() => this.setState({
                                           tooltipContent: ""
                                       })}
                            />
                        )}
                    </Geographies>
                </ComposableMap>
                <ReactTooltip html={true}>{this.state.tooltipContent}</ReactTooltip>
            </>
        )
    }
}
