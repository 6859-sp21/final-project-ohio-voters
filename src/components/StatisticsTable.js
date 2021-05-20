import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {CSVDownload} from "react-csv";
import {elementOrEmpty} from "react-csv/src/core";
import {buildURI} from "../utils/calculations";
import {firebaseDatabase} from "../utils/data";

const keys = ["voter_SOS_ID", "CONGRESSIONAL_DISTRICT", "COUNTY_ID", "COUNTY_NUMBER", "COURT_OF_APPEALS",
    "DATE_OF_BIRTH", "FIRST_NAME", "General", "LAST_NAME", "PRECINCT_CODE", "PRECINCT_NAME",
    "Primary", "REGISTRATION_DATE", "RESIDENTIAL_ADDRESS1", "RESIDENTIAL_CITY",
    "RESIDENTIAL_SECONDARY_ADDR", "RESIDENTIAL_ZIP", "STATE_BOARD_OF_EDUCATION",
    "STATE_REPRESENTATIVE_DISTRICT", "STATE_SENATE_DISTRICT", "Score", "Special", "VOTER_STATUS"]

export default class StatisticsTable extends Component {
    getHeader = () => {
        if (!this.props.localityType) {
            return "Ohio"
        } else if (this.props.localityType === 'usHouseDistrict') {
            return `US House District: ${this.props.statData.CONGRESSIONAL_DISTRICT}`
        } else if (this.props.localityType === 'stateSenateDistrict') {
            return `Ohio Senate District: ${this.props.statData.STATE_SENATE_DISTRICT}`
        } else if (this.props.localityType === 'stateHouseDistrict') {
            return `Ohio House District: ${this.props.statData.STATE_REPRESENTATIVE_DISTRICT}`
        } else if (this.props.localityType === 'cities') {
            return `City: ${this.props.statData.CITY}`
        } else if (this.props.localityType === 'zipcode') {
            return `Zipcode: ${this.props.statData.RESIDENTIAL_ZIP}`
        }
    }

    getData = () => {
        if (!this.props.statData) {
            return {
                Age: '46.11 ± 17.98',
                "Party Skew": '0.03040',
                "# Registered Voters": '180871',
                "Overall AVES": '0.140',
                "General Election AVES": '0.259',
                "Primary Election AVES": '0.052',
                "Special Election AVES": '0.023',
            }
        }
        if (this.props.statData.noData) {
            return {
                Error: "No data found"
            }
        } else {
            return {
                Age: `${this.props.statData.avg_age.toFixed(2)} ± ${(this.props.statData.age_stddev || 0).toFixed(2)}`,
                "Party Skew": this.props.statData.CODED_PARTY_AFFILIATION.toFixed(5),
                "# Registered Voters": this.props.statData["Number of Rows (Aggregated)"],
                "Overall AVES": this.props.statData.Score.toFixed(3),
                "General Election AVES": this.props.statData.General.toFixed(3),
                "Primary Election AVES": this.props.statData.Primary.toFixed(3),
                "Special Election AVES": this.props.statData.Special.toFixed(3)
            };
        }
    }

    downloadCSV = () => {
        firebaseDatabase.ref(`zipcodes/${this.props.statData.RESIDENTIAL_ZIP}/voters`)
            .get()
            .then(snapshot => {
                const array = [
                    keys
                ]
                snapshot.forEach(voterSnapshot => {
                    const newArray = []
                    const val = voterSnapshot.val()
                    for (const key of keys) {
                        if (key === "voter_SOS_ID") {
                            newArray.push(voterSnapshot.key)
                        } else {
                            newArray.push(val[key])
                        }
                    }
                    array.push(newArray)
                })
                window.open(buildURI(array))
            })
    }

    render() {
        return (
            <div style={{width: "30%"}}>
                <h2>
                    Locality AAPI Statistics:
                </h2>
                {this.props.loading ?
                    <div style={{
                        width: "100%",
                        border: "1px solid white",
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 310,
                        color: "#bbb",
                        fontSize: 20
                    }}>
                        <p>
                            <FontAwesomeIcon icon={faSpinner} pulse/> Loading...
                        </p>
                    </div>
                    :
                    <div style={{width: "100%", height: 310, border: "1px solid white", borderRadius: 4}}>
                        <h3>
                            {this.getHeader()}
                        </h3>
                        {Object.entries(this.getData()).map(([label, value]) => (
                            <p key={label}>{label}: {value}</p>
                        ))}
                    </div>
                }
                <div style={{fontSize: 10, width: "100%", textAlign: "center", marginTop: 16}}>
                    <i>Source: Ohio Secretary of State, Dr. Tom Wong (UCSD Political Science Department).</i>
                </div>
                {this.props.localityType === 'zipcode' &&
                <button onClick={this.downloadCSV} style={{marginTop: 16}}>
                    Download Voter CSV
                </button>
                }
                {this.props.localityType !== 'zipcode' &&
                <div style={{marginTop: 24}}>
                    Drill down to a specific zipcode of interest to download its voter profiles as a CSV!
                </div>
                }
            </div>
        )
    }

}
