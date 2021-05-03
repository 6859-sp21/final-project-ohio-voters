import React, {Component} from "react";
import {getCincinnatiZipCodes, getZipcodeVoters} from "../utils/data";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";
import VoterDataTable from "./VoterDataTable";

export default class CincinnatiZipcodes extends Component {
    state = {
        cincinnatiCounties: null,
        projection: null,
        tooltipContent: "",
        position: {zoom: 1, coordinates: [-84.28399485924794, 39.236390248105536]},
        clickedZipcode: null,
        tableData: null
    }

    componentDidMount() {
        getCincinnatiZipCodes().then(cincinnatiCounties => this.setState({
            cincinnatiCounties,
            projection: geoEquirectangular().fitExtent([[200, 0], [600, 500]], cincinnatiCounties)
        }));
    }

    handleZipcodeClicked = zipcode => {
        if (zipcode !== this.state.clickedZipcode) {
            getZipcodeVoters(zipcode).then(voters => {
                this.setState({tableData: voters, clickedZipcode: zipcode})
            })
        }
    }

    zoomIn = () => {
        const coordinates = this.state.position.coordinates;
        if (this.state.position.zoom >= 4) {
            this.setState({position: {coordinates, zoom: 8}})
        } else {
            this.setState({position: {coordinates, zoom: this.state.position.zoom * 2}})
        }
    }

    zoomOut = () => {
        const coordinates = this.state.position.coordinates;
        if (this.state.position.zoom <= 2) {
            this.setState({position: {coordinates, zoom: 1}})
        } else {
            this.setState({position: {coordinates, zoom: this.state.position.zoom / 2}})
        }
    }

    render() {
        return (
            this.state.cincinnatiCounties ?
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{width: "50%"}}>
                        <div>
                            <button onClick={this.zoomOut}>
                                -
                            </button>
                            <button onClick={this.zoomIn}>
                                +
                            </button>
                            <button onClick={() => this.setState({
                                position: {
                                    zoom: 1,
                                    coordinates: [-84.28399485924794, 39.236390248105536]
                                }
                            })}>
                                Reset
                            </button>
                        </div>
                        <ComposableMap data-tip={this.state.tooltipContent}
                                       projection={this.state.projection}
                                       width={500}
                                       height={500}
                                       style={{border: "solid 1px black", borderRadius: 4, margin: 10}}
                        >
                            <ZoomableGroup zoom={this.state.position.zoom}
                                           center={this.state.position.coordinates}
                                           onMoveEnd={position => this.setState({position})}>
                                <Geographies geography={this.state.cincinnatiCounties}>
                                    {({geographies}) => geographies.map(geography =>
                                        <Geography key={geography.rsmKey}
                                                   geography={geography}
                                                   fill="#aaa"
                                                   stroke="black"
                                                   onClick={() => this.handleZipcodeClicked(geography.properties['ZCTA5CE10'])}
                                            // onMouseEnter={() => this.setState({tooltipContent: geography.properties['ZCTA5CE10']})}
                                            // onMouseLeave={() => this.setState({tooltipContent: ""})}
                                        />
                                    )}
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                        <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
                    </div>
                    <div style={{
                        width: "100%",
                        margin: "30px 10px 10px",
                    }}>
                        {this.state.tableData &&
                        <VoterDataTable data={this.state.tableData}/>
                        }
                    </div>
                </div>
                :
                null
        );
    }
}
