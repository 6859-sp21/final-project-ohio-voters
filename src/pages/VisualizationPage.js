import React, {Component} from "react";
import OhioCities from "../components/OhioCities";
import OhioSenateDistricts from "../components/OhioSenateDistricts";
import USHouseDistricts from "../components/USHouseDistricts";
import OhioHouseDistricts from "../components/OhioHouseDistricts";
import StatisticsTable from "../components/StatisticsTable";

export default class VisualizationPage extends Component {
    state = {
        selectedTab: 0,
        statData: null,
        localityType: null
    }

    setStatData = (statData, localityType) => this.setState({statData, localityType});

    toggleSelectedTab = selectedTab => {
        if (selectedTab !== this.state.selectedTab) {
            this.setState({selectedTab, statData: null, localityType: null})
        }
    }

    render() {
        return (
            <>
                <div style={{padding: 20}}>
                    <button onClick={() => this.toggleSelectedTab(0)}>
                        US House District
                    </button>
                    <button onClick={() => this.toggleSelectedTab(1)}>
                        Ohio Senate District
                    </button>
                    <button onClick={() => this.toggleSelectedTab(2)}>
                        Ohio House District
                    </button>
                    <button onClick={() => this.toggleSelectedTab(3)}>
                        Cities
                    </button>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}>
                    <div style={{width: "50%"}}>
                        {this.state.selectedTab === 0 && <USHouseDistricts setStatData={this.setStatData}/>}
                        {this.state.selectedTab === 1 && <OhioSenateDistricts setStatData={this.setStatData}/>}
                        {this.state.selectedTab === 2 && <OhioHouseDistricts setStatData={this.setStatData}/>}
                        {this.state.selectedTab === 3 && <OhioCities setStatData={this.setStatData}/>}
                    </div>
                    {this.state.statData &&
                    <StatisticsTable localityType={this.state.localityType} statData={this.state.statData}/>
                    }
                </div>
            </>
        )
    }

}
