import React, {Component} from "react";
import {firebaseDatabase, getOhioHouseDistricts, getOhioZipcodes} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";
import Loading from "./Loading";
import {getLocalityColor, LocalityColorLegend} from "../utils/calculations";

export default class OhioHouseDistricts extends Component {
    state = {
        ohioHouseDistricts: null,
        ohioZipcodes: null,
        projection: null,
        clickedDistrict: null,
        clickedDistrictGeography: null,
        clickedZipcode: null,
        tooltipContent: "",
        loading: true,
        hoveringSkew: null
    }

    componentDidMount() {
        const promises = [getOhioHouseDistricts(), getOhioZipcodes()];
        Promise.all(promises).then(async ([ohioHouseDistricts, ohioZipcodes]) => {
            await firebaseDatabase.ref('summaryStats/stateHouseDistricts').get().then(snapshot => {
                snapshot.forEach(districtSnapshot => {
                    this.setState({[districtSnapshot.key]: districtSnapshot.val().CODED_PARTY_AFFILIATION})
                })
            })
            await firebaseDatabase.ref('summaryStats/zipcodes').get().then(snapshot => {
                snapshot.forEach(zipcodeSnapshot => {
                    this.setState({[zipcodeSnapshot.key]: zipcodeSnapshot.val().CODED_PARTY_AFFILIATION})
                })
            })
            this.setState({
                ohioHouseDistricts,
                ohioZipcodes,
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 380]], ohioHouseDistricts),
                loading: false
            })
            this.props.setLoadingStatData(false)
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
            projection: geoEquirectangular().fitExtent([[20, 20], [480, 380]], this.state.ohioHouseDistricts),
            clickedDistrict: null,
            clickedDistrictGeography: null
        })
        this.props.setStatData(null, null)
    }

    zoomToDistrict = geography => {
        this.setState({loading: true})
        this.props.setLoadingStatData(true)
        firebaseDatabase.ref(`summaryStats/stateHouseDistricts/${geography.properties.DISTRICT}`)
            .once('value')
            .then(snapshot => snapshot.val())
            .then(data => {
                this.setState({
                    projection: geoEquirectangular().fitExtent([[20, 20], [480, 380]], geography),
                    clickedDistrict: geography.properties.DISTRICT,
                    clickedDistrictGeography: geography,
                    clickedZipcode: null,
                    loading: false
                })
                this.props.setStatData(data, "stateHouseDistrict")
            })
    }

    handleZipcodeClicked = geography => {
        this.setState({loading: true})
        this.props.setLoadingStatData(true)
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
                        projection: geography && geoEquirectangular().fitExtent([[20, 20], [480, 380]], geography),
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
            this.state.ohioHouseDistricts &&
            <>
                <ComposableMap projection={this.state.projection}
                               data-tip={this.state.tooltipContent}
                               width={500}
                               height={400}
                               style={{margin: 10}}>
                    {this.state.clickedDistrict &&
                    <Geographies geography={this.state.ohioZipcodes}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       className="hover-geography"
                                       stroke="black"
                                       strokeWidth={this.state.clickedZipcode === geography.properties.ZCTA5CE10 ? 2 : 1}
                                       fill={getLocalityColor(this.state[geography.properties.ZCTA5CE10])}
                                       onClick={() => this.handleZipcodeClicked(geography)}
                                       onMouseEnter={() => this.setState({
                                           tooltipContent: `<p>Zipcode ${geography.properties.ZCTA5CE10}</p>`,
                                           hoveringSkew: this.state[geography.properties.ZCTA5CE10]
                                       })}
                                       onMouseLeave={() => this.setState({
                                           tooltipContent: "",
                                           hoveringSkew: null
                                       })}
                            />
                        )}
                    </Geographies>
                    }
                    <Geographies geography={this.state.ohioHouseDistricts}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       className="hover-geography"
                                       fill={this.state.clickedDistrict ?
                                           "none"
                                           :
                                           getLocalityColor(this.state[geography.properties.DISTRICT])
                                       }
                                       stroke="black"
                                       strokeWidth={geography.properties.DISTRICT === this.state.clickedDistrict ? 2 : 1}
                                       onClick={() => this.handleGeographyClicked(geography)}
                                       onMouseEnter={() => this.setState({
                                           tooltipContent: `<p>District ${geography.properties.DISTRICT}</p><p>Incumbent: ${geography.properties.FIRSTNAME} ${geography.properties.LASTNAME} (${geography.properties.PARTY})</p>`,
                                           hoveringSkew: this.state[geography.properties.DISTRICT]
                                       })}
                                       onMouseLeave={() => this.setState({
                                           tooltipContent: "",
                                           hoveringSkew: null
                                       })}
                            />
                        )}
                    </Geographies>
                </ComposableMap>
                <LocalityColorLegend position={this.state.hoveringSkew}/>
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
