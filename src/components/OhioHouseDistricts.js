import React, {Component} from "react";
import {firebaseDatabase, getOhioHouseDistricts, getOhioZipcodes} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class OhioHouseDistricts extends Component {
    state = {
        ohioHouseDistricts: null,
        ohioZipcodes: null,
        projection: null,
        clickedDistrict: null,
        clickedZipcode: null,
        tooltipContent: ""
    }

    componentDidMount() {
        const promises = [getOhioHouseDistricts(), getOhioZipcodes()];
        Promise.all(promises).then(([ohioHouseDistricts, ohioZipcodes]) => {
            this.setState({
                ohioHouseDistricts,
                ohioZipcodes,
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], ohioHouseDistricts),
            })
        })
    }

    handleGeographyClicked = geography => {
        if (geography.properties.DISTRICT === this.state.clickedDistrict) {
            this.setState({
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], this.state.ohioHouseDistricts),
                clickedDistrict: null
            })
            this.props.setStatData(null, null)
        } else {
            firebaseDatabase.ref(`summaryStats/stateHouseDistricts/${geography.properties.DISTRICT}`)
                .once('value')
                .then(snapshot => snapshot.val())
                .then(data => {
                    this.setState({
                        projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], geography),
                        clickedDistrict: geography.properties.DISTRICT
                    })
                    this.props.setStatData(data, "stateHouseDistrict")
                })
        }
    }

    handleZipcodeClicked = geography => {
        if (geography.properties.ZCTA5CE10 !== this.state.clickedZipcode) {
            firebaseDatabase.ref(`summaryStats/zipcodes/${geography.properties.ZCTA5CE10}`)
                .once('value')
                .then(snapshot => snapshot.val())
                .then(data => this.props.setStatData(data || {
                    RESIDENTIAL_ZIP: geography.properties.ZCTA5CE10,
                    noData: true
                }, "zipcode"))
            this.setState({clickedZipcode: geography.properties.ZCTA5CE10})
        }
    }

    render() {
        return (
            this.state.ohioHouseDistricts &&
            <>
                <ComposableMap projection={this.state.projection}
                               data-tip={this.state.tooltipContent}
                               width={500}
                               height={500}
                               style={{border: "solid 1px black", borderRadius: 4, margin: 10}}>
                    <Geographies geography={this.state.ohioHouseDistricts}>
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
                    {this.state.clickedDistrict &&
                    <Geographies geography={this.state.ohioZipcodes}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       className="hover-geography"
                                       stroke="black"
                                       strokeWidth={this.state.clickedZipcode === geography.properties.ZCTA5CE10 ? 2 : 1}
                                       fill="transparent"
                                       fillOpacity={0.6}
                                       onClick={() => this.handleZipcodeClicked(geography)}
                                       onMouseEnter={() => this.setState({
                                           tooltipContent: `<p>Zipcode ${geography.properties.ZCTA5CE10}</p>`,
                                       })}
                                       onMouseLeave={() => this.setState({
                                           tooltipContent: ""
                                       })}
                            />
                        )}
                    </Geographies>
                    }
                </ComposableMap>
                <ReactTooltip html={true}>{this.state.tooltipContent}</ReactTooltip>
            </>
        )
    }
}
