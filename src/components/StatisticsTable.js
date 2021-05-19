import React, {Component} from "react";

export default class StatisticsTable extends Component {
    getHeader = () => {
        if (this.props.localityType === 'usHouseDistrict') {
            return `US House District: ${this.props.statData.CONGRESSIONAL_DISTRICT}`
        } else if (this.props.localityType === 'stateSenateDistrict') {
            return `Ohio Senate District: ${this.props.statData.STATE_SENATE_DISTRICT}`
        } else if (this.props.localityType === 'stateHouseDistrict') {
            return `Ohio House District: ${this.props.statData.STATE_REPRESENTATIVE_DISTRICT}`
        }
    }

    getData = () => {
        return {
            Age: `${this.props.statData.avg_age.toFixed(2)} ± ${this.props.statData.age_stddev.toFixed(2)}`,
            "Party Skew": this.props.statData.CODED_PARTY_AFFILIATION.toFixed(5),
            "# Registered Voters": this.props.statData["Number of Rows (Aggregated)"],
            "Overall AVES": this.props.statData.Score.toFixed(3),
            "General Election AVES": this.props.statData.General.toFixed(3),
            "Primary Election AVES": this.props.statData.Primary.toFixed(3),
            "Special Election AVES": this.props.statData.Special.toFixed(3)
        };
    }

    render() {
        return (
            <div style={{width: "30%", border: "1px solid black", borderRadius: 4}}>
                <h3>
                    {this.getHeader()}
                </h3>
                {Object.entries(this.getData()).map(([label, value]) => (
                    <p>{label}: {value}</p>
                ))}
            </div>
        )
    }
}
