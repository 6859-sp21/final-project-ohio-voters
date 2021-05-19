import React, {Component} from "react";
import {firebaseDatabase, getOhioCities, getOhioOutline, getOhioZipcodes} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";
import Loading from "./Loading";
import {getLocalityColor} from "../utils/calculations";

export default class OhioCities extends Component {
    state = {
        ohioCities: null,
        ohioOutline: null,
        ohioZipcodes: null,
        projection: null,
        clickedCity: null,
        clickedCityGeography: null,
        clickedZipcode: null,
        tooltipContent: "",
        loading: true
    }

    componentDidMount() {
        const promises = [getOhioCities(), getOhioOutline(), getOhioZipcodes()];
        Promise.all(promises).then(async([ohioCities, ohioOutline, ohioZipcodes]) => {
            await firebaseDatabase.ref('summaryStats/cities').get().then(snapshot => {
                snapshot.forEach(citySnapshot => {
                    this.setState({[citySnapshot.key]: citySnapshot.val().CODED_PARTY_AFFILIATION})
                })
            })
            await firebaseDatabase.ref('summaryStats/zipcodes').get().then(snapshot => {
                snapshot.forEach(zipcodeSnapshot => {
                    this.setState({[zipcodeSnapshot.key]: zipcodeSnapshot.val().CODED_PARTY_AFFILIATION})
                })
            })
            this.setState({
                ohioCities,
                ohioOutline,
                ohioZipcodes,
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], ohioOutline),
                loading: false
            })
            this.props.setLoadingStatData(false)
        })
    }

    handleGeographyClicked = geography => {
        if (geography.properties.NAME === this.state.clickedCity) {
            this.zoomToOhio()
        } else {
            this.zoomToCity(geography)
        }
    }

    zoomToOhio = () => {
        this.setState({
            projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], this.state.ohioOutline),
            clickedCity: null,
            clickedCityGeography: null
        })
        this.props.setStatData(null, null)
    }

    zoomToCity = geography => {
        this.setState({loading: true})
        this.props.setLoadingStatData(true)
        firebaseDatabase.ref(`summaryStats/cities/${geography.properties.NAME.toLocaleUpperCase()}`)
            .once('value')
            .then(snapshot => snapshot.val())
            .then(data => {
                this.setState({
                    projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], geography),
                    clickedCity: geography.properties.NAME,
                    clickedCityGeography: geography,
                    clickedZipcode: null,
                    loading: false
                })
                this.props.setStatData(data, 'cities')
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
            this.state.ohioCities &&
            <>
                <ComposableMap projection={this.state.projection}
                               data-tip={this.state.tooltipContent}
                               width={500}
                               height={500}
                               style={{margin: 10}}>
                    <Geographies geography={this.state.ohioOutline}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       fill="transparent"
                                       stroke="black"
                            />
                        )}
                    </Geographies>
                    {this.state.clickedCity &&
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
                                       })}
                                       onMouseLeave={() => this.setState({
                                           tooltipContent: ""
                                       })}
                            />
                        )}
                    </Geographies>
                    }
                    <Geographies geography={this.state.ohioCities}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       className="hover-geography"
                                       fill={this.state.clickedCity ?
                                           "none"
                                           :
                                           getLocalityColor(this.state[geography.properties.NAME.toLocaleUpperCase()])
                                       }
                                       stroke="black"
                                       strokeWidth={geography.properties.NAME === this.state.clickedCity ? 2 : 1}
                                       onClick={() => this.handleGeographyClicked(geography)}
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
                {this.state.clickedCity && !this.state.clickedZipcode &&
                <button onClick={this.zoomToOhio}>
                    Back to Ohio
                </button>
                }
                {this.state.clickedZipcode &&
                <button
                    onClick={() => this.zoomToCity(this.state.clickedCityGeography)}>
                    Back to {this.state.clickedCity}
                </button>
                }
                <ReactTooltip html={true}>{this.state.tooltipContent}</ReactTooltip>
            </>
        )
    }
}
