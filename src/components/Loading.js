import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default class Loading extends Component {
    render() {
        return (
            <div style={{
                width: 500,
                height: 500,
                margin: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#555"
            }}>
                <p>
                    <FontAwesomeIcon icon={faSpinner} pulse/> Loading...
                </p>
            </div>
        )
    }
}
