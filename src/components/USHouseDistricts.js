import React, {Component} from "react";
import {getUSHouseDistricts} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class USHouseDistricts extends Component {
    state = {
        usHouseDistricts: null,
        projection: null,
        tooltipContent: ""
    }

    componentDidMount() {
        getUSHouseDistricts().then(usHouseDistricts => this.setState({
            usHouseDistricts,
            projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], usHouseDistricts)
        }));
    }

    render() {
        return (
            this.state.usHouseDistricts &&
            <>
                <ComposableMap projection={this.state.projection}
                               data-tip={this.state.tooltipContent}
                               width={500}
                               height={500}
                               style={{border: "solid 1px black", borderRadius: 4, margin: 10}}>
                    <Geographies geography={this.state.usHouseDistricts}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       fill="#aaa"
                                       stroke="black"
                                       onMouseEnter={() => this.setState({
                                           tooltipContent: `<p>District ${geography.properties.DISTRICT}</p><p>Incumbent: ${geography.properties.FIRSTNAME} ${geography.properties.LASTNAME} (${geography.properties.PARTY})</p>`,
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
