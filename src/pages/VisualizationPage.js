import React, {Component} from "react";
import {getCincinnatiCounties} from "../utils/data";
import CincinnatiCounties from "../components/CincinnatiCounties";

export default class VisualizationPage extends Component {
    state = {
        cincinnatiCounties: null
    }

    componentDidMount() {
        getCincinnatiCounties().then(cincinnatiCounties => this.setState({cincinnatiCounties}));
    }

    render() {
        return (
            <>
                <div>Visualization Page</div>
                <CincinnatiCounties/>
            </>
        )
    }

}
