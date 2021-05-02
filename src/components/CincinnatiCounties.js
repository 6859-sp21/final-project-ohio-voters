import React, {Component} from "react";
import {getCincinnatiCounties, getCincinnatiZipCodes} from "../utils/data";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {geoEquirectangular} from "d3-geo";
import ReactTooltip from "react-tooltip";

export default class CincinnatiCounties extends Component {
    state = {
        cincinnatiCounties: null,
        projection: null,
        tooltipContent: "",
    }

    componentDidMount() {
        getCincinnatiZipCodes().then(cincinnatiCounties => this.setState({
            cincinnatiCounties,
            projection: geoEquirectangular().fitExtent([[200, 0], [600, 500]], cincinnatiCounties)
        }));
    }

    render() {
        return (
            this.state.cincinnatiCounties ?
                <>
                    <ComposableMap data-tip={this.state.tooltipContent}
                                   projection={this.state.projection}
                                   projectionConfig={{rotate: [0, 20, 0]}}
                                   width={800}
                                   height={500}
                    >
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
                    </ComposableMap>
                    <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
                </>
                :
                null
        );
    }
}
