import React, {Component} from "react";
import {getOhioSenateDistricts} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class OhioSenateDistricts extends Component {
    state = {
        ohioSenateDistricts: null,
        projection: null,
        clickedDistrict: null,
        tooltipContent: ""
    }

    componentDidMount() {
        getOhioSenateDistricts().then(ohioSenateDistricts => this.setState({
            ohioSenateDistricts,
            projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], ohioSenateDistricts)
        }));
    }

    handleGeographyClicked = geography => {
        if (geography.properties.DISTRICT === this.state.clickedDistrict) {
            this.setState({
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], this.state.ohioSenateDistricts),
                clickedDistrict: null
            })
        } else {
            this.setState({
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], geography),
                clickedDistrict: geography.properties.DISTRICT
            })
        }
    }

    render() {
        return (
            this.state.ohioSenateDistricts &&
            <>
                <ComposableMap projection={this.state.projection}
                               data-tip={this.state.tooltipContent}
                               width={500}
                               height={500}
                               style={{border: "solid 1px black", borderRadius: 4, margin: 10}}>
                    <Geographies geography={this.state.ohioSenateDistricts}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       fill={geography.properties.DISTRICT === this.state.clickedDistrict ? "#9f67fa80" : "#aaa"}
                                       stroke="black"
                                       onClick={() => this.handleGeographyClicked(geography)}
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