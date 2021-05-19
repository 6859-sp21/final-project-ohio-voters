import React, {Component} from "react";
import {firebaseDatabase, getOhioCities, getOhioOutline} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class OhioCities extends Component {
    state = {
        ohioCities: null,
        ohioOutline: null,
        projection: null,
        clickedCity: null,
        tooltipContent: ""
    }

    componentDidMount() {
        getOhioCities().then(ohioCities => {
            getOhioOutline().then(ohioOutline =>
                this.setState({
                    ohioCities,
                    ohioOutline,
                    projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], ohioCities)
                })
            )
        });
    }

    handleGeographyClicked = geography => {
        if (geography.properties.NAME === this.state.clickedCity) {
            this.setState({
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], this.state.ohioCities),
                clickedCity: null
            })
            this.props.setStatData(null, null)
        } else {
            firebaseDatabase.ref(`summaryStats/cities/${geography.properties.NAME.toLocaleUpperCase()}`)
                .once('value')
                .then(snapshot => snapshot.val())
                .then(data => this.props.setStatData(data, 'cities'))
            this.setState({
                projection: geoEquirectangular().fitExtent([[20, 20], [480, 480]], geography),
                clickedCity: geography.properties.NAME
            })
        }
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
                    <Geographies geography={this.state.ohioOutline}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       fill="transparent"
                                       stroke="black"
                            />
                        )}
                    </Geographies>
                    <Geographies geography={this.state.ohioCities}>
                        {({geographies}) => geographies.map(geography =>
                            <Geography key={geography.rsmKey}
                                       geography={geography}
                                       fill={geography.properties.NAME === this.state.clickedCity ? "#9f67fa80" : "#aaa"}
                                       stroke="black"
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
                <ReactTooltip html={true}>{this.state.tooltipContent}</ReactTooltip>
            </>
        )
    }
}
