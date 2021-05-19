import React, {Component} from "react";
import {firebaseDatabase, getOhioSenateDistricts, getOhioZipcodes} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";
import Loading from "./Loading";

export default class OhioSenateDistricts extends Component {
    state = {
        ohioSenateDistricts: null,
        ohioZipcodes: null,
        projection: null,
        clickedDistrict: null,
        clickedDistrictGeography: null,
        clickedZipcode: null,
        tooltipContent: "",
        loading: true
    }

    componentDidMount() {
        const promises = [getOhioSenateDistricts(), getOhioZipcodes()];
        Promise.all(promises).then(([ohioSenateDistricts, ohioZipcodes]) => {
            this.setState({
                ohioSenateDistricts,
                ohioZipcodes,
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], ohioSenateDistricts),
                loading: false
            })
        })
    }

    handleGeographyClicked = geography => {
        if (geography.properties.DISTRICT === this.state.clickedDistrict) {
            this.zoomToOhio()
        } else {
            this.zoomToDistrict(geography)
        }
    }

    zoomToOhio = () => {
        this.setState({
            projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], this.state.ohioSenateDistricts),
            clickedDistrict: null,
            clickedDistrictGeography: null
        })
        this.props.setStatData(null, null)
    }

    zoomToDistrict = (geography) => {
        this.setState({loading: true})
        firebaseDatabase.ref(`summaryStats/stateSenateDistricts/${geography.properties.DISTRICT}`)
            .once('value')
            .then(snapshot => snapshot.val())
            .then(data => {
                this.setState({
                    projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], geography),
                    clickedDistrict: geography.properties.DISTRICT,
                    clickedDistrictGeography: geography,
                    clickedZipcode: null,
                    loading: false
                })
                this.props.setStatData(data, "stateSenateDistrict")
            })
    }

    handleZipcodeClicked = geography => {
        this.setState({loading: true})
        if (geography.properties.ZCTA5CE10 !== this.state.clickedZipcode) {
            firebaseDatabase.ref(`summaryStats/zipcodes/${geography.properties.ZCTA5CE10}`)
                .once('value')
                .then(snapshot => snapshot.val())
                .then(data => {
                    this.props.setStatData(data || {
                        RESIDENTIAL_ZIP: geography.properties.ZCTA5CE10,
                        noData: true
                    }, "zipcode")
                    this.setState({
                        clickedZipcode: geography.properties.ZCTA5CE10,
                        projection: geography && geoEquirectangular().fitExtent([[20, 20], [480, 480]], geography),
                        loading: false
                    })
                })
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading/>
            )
        }
        return (
            this.state.ohioSenateDistricts &&
            <>
                <ComposableMap projection={this.state.projection}
                               data-tip={this.state.tooltipContent}
                               width={500}
                               height={500}
                               style={{margin: 10}}>
                    <Geographies geography={this.state.ohioSenateDistricts}>
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
                {this.state.clickedDistrict && !this.state.clickedZipcode &&
                <button onClick={this.zoomToOhio}>
                    Back to Ohio
                </button>
                }
                {this.state.clickedZipcode &&
                <button
                    onClick={() => this.zoomToDistrict(this.state.clickedDistrictGeography)}>
                    Back to District {this.state.clickedDistrict}
                </button>
                }
                <ReactTooltip html={true}>{this.state.tooltipContent}</ReactTooltip>
            </>
        )
    }
}
