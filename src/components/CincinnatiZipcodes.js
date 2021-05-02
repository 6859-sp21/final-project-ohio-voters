import React, {Component} from "react";
import {getCincinnatiZipCodes} from "../utils/data";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class CincinnatiZipcodes extends Component {
    state = {
        cincinnatiCounties: null,
        projection: null,
        tooltipContent: "",
        position: {zoom: 1, coordinates: [-84.28399485924794, 39.236390248105536]}
    }

    componentDidMount() {
        getCincinnatiZipCodes().then(cincinnatiCounties => this.setState({
            cincinnatiCounties,
            projection: geoEquirectangular().fitExtent([[200, 0], [600, 500]], cincinnatiCounties)
        }));
    }

    zoomIn = () => {
        if (this.state.position.zoom >= 4) {
            this.setState({position: {...this.state.position, zoom: 8}})
        } else {
            this.setState({position: {...this.state.position, zoom: this.state.position.zoom * 2}})
        }
    }

    zoomOut = () => {
        if (this.state.position.zoom <= 2) {
            this.setState({position: {...this.state.position, zoom: 1}})
        } else {
            this.setState({position: {...this.state.position, zoom: this.state.position.zoom / 2}})
        }
    }

    render() {
        return (
            this.state.cincinnatiCounties ?
                <>
                    <div>
                        <button onClick={this.zoomOut}>
                            -
                        </button>
                        <button onClick={this.zoomIn}>
                            +
                        </button>
                        <button onClick={() => this.setState({position: {zoom: 1, coordinates: [-84.28399485924794, 39.236390248105536]}})}>
                            Reset
                        </button>
                    </div>
                    <ComposableMap data-tip={this.state.tooltipContent}
                                   projection={this.state.projection}
                                   projectionConfig={{rotate: [0, 20, 0]}}
                                   width={800}
                                   height={500}
                    >
                        <ZoomableGroup zoom={this.state.position.zoom}
                                       center={this.state.position.coordinates}
                                       translateExtent={[[0, 0], [800, 500]]}
                                       onMoveEnd={position => this.setState({position})}>
                            <Geographies geography={this.state.cincinnatiCounties}>
                                {({geographies}) => geographies.map(geography =>
                                    <Geography key={geography.rsmKey}
                                               geography={geography}
                                               fill="#aaa"
                                               stroke="black"
                                               onMouseEnter={() => this.setState({tooltipContent: geography.properties['ZCTA5CE10']})}
                                               onMouseLeave={() => this.setState({tooltipContent: ""})}
                                    />
                                )}
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                    <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
                </>
                :
                null
        );
    }
}
