import React, {Component} from "react";
import {firebaseDatabase, getUSHouseDistricts} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class USHouseDistricts extends Component {
    state = {
        usHouseDistricts: null,
        projection: null,
        clickedDistrict: null,
        tooltipContent: ""
    }

    componentDidMount() {
        getUSHouseDistricts().then(usHouseDistricts => this.setState({
            usHouseDistricts,
            projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], usHouseDistricts)
        }));
    }

    handleGeographyClicked = geography => {
        if (geography.properties.DISTRICT === this.state.clickedDistrict) {
            this.setState({
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], this.state.usHouseDistricts),
                clickedDistrict: null
            })
            this.props.setStatData(null, null)
        } else {
            firebaseDatabase.ref(`summaryStats/congressionalDistricts/${geography.properties.DISTRICT}`)
                .once('value')
                .then(snapshot => snapshot.val())
                .then(data => this.props.setStatData(data, "usHouseDistrict"))
            this.setState({
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], geography),
                clickedDistrict: geography.properties.DISTRICT
            })
        }
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
                                       className="hover-geography"
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
