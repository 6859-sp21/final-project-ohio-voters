import React, {Component} from "react";
import OhioCities from "../components/OhioCities";
import OhioSenateDistricts from "../components/OhioSenateDistricts";
import USHouseDistricts from "../components/USHouseDistricts";
import OhioHouseDistricts from "../components/OhioHouseDistricts";
import StatisticsTable from "../components/StatisticsTable";

export default class MapPage extends Component {
    state = {
        selectedTab: 0,
        statData: null,
        localityType: null,
        loadingStatData: true
    }

    setStatData = (statData, localityType) => this.setState({statData, localityType, loadingStatData: false});

    toggleSelectedTab = selectedTab => {
        if (selectedTab !== this.state.selectedTab) {
            this.setState({selectedTab, statData: null, localityType: null, loadingStatData: true})
        }
    }

    setLoadingStatData = isLoading => this.setState({loadingStatData: isLoading});

    render() {
        return (
            <>
                <div style={{padding: 20}}>
                    <button className={this.state.selectedTab === 0 && "selected"}
                            onClick={() => this.toggleSelectedTab(0)}>
                        US House District
                    </button>
                    <button className={this.state.selectedTab === 1 && "selected"}
                            onClick={() => this.toggleSelectedTab(1)}>
                        Ohio Senate District
                    </button>
                    <button className={this.state.selectedTab === 2 && "selected"}
                            onClick={() => this.toggleSelectedTab(2)}>
                        Ohio House District
                    </button>
                    <button className={this.state.selectedTab === 3 && "selected"}
                            onClick={() => this.toggleSelectedTab(3)}>
                        Cities
                    </button>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center"
                }}>
                    <div style={{width: "50%", maxWidth: 500, height: 500}}>
                        {this.state.selectedTab === 0 && <USHouseDistricts setStatData={this.setStatData}
                                                                           setLoadingStatData={this.setLoadingStatData}/>}
                        {this.state.selectedTab === 1 && <OhioSenateDistricts setStatData={this.setStatData}
                                                                              setLoadingStatData={this.setLoadingStatData}/>}
                        {this.state.selectedTab === 2 && <OhioHouseDistricts setStatData={this.setStatData}
                                                                             setLoadingStatData={this.setLoadingStatData}/>}
                        {this.state.selectedTab === 3 && <OhioCities setStatData={this.setStatData}
                                                                     setLoadingStatData={this.setLoadingStatData}/>}
                    </div>
                    <StatisticsTable localityType={this.state.localityType} statData={this.state.statData}
                                     loading={this.state.loadingStatData}/>
                </div>
            </>
        )
    }

}
