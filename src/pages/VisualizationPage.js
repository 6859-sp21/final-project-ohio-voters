import React, {Component} from "react";
import OhioCities from "../components/OhioCities";
import OhioSenateDistricts from "../components/OhioSenateDistricts";
import USHouseDistricts from "../components/USHouseDistricts";
import OhioHouseDistricts from "../components/OhioHouseDistricts";

export default class VisualizationPage extends Component {
    state = {
        selected: 0
    }

    render() {
        return (
            <>
                <div style={{padding: 20}}>
                    <button onClick={() => this.setState({selected: 0})}>
                        US House District
                    </button>
                    <button onClick={() => this.setState({selected: 1})}>
                        Ohio Senate District
                    </button>
                    <button onClick={() => this.setState({selected: 2})}>
                        Ohio House District
                    </button>
                    <button onClick={() => this.setState({selected: 3})}>
                        Cities
                    </button>
                </div>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{width: "50%"}}>
                        {this.state.selected === 0 && <USHouseDistricts/>}
                        {this.state.selected === 1 && <OhioSenateDistricts/>}
                        {this.state.selected === 2 && <OhioHouseDistricts/>}
                        {this.state.selected === 3 && <OhioCities/>}
                    </div>
                </div>
            </>
        )
    }

}
