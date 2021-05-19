import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import * as d3 from "d3";
import {firebaseDatabase,  getAgeInfluences} from '../utils/data'

import "../App.css";
import { callbackify } from "util";

const areaOptions = [
  "Ohio House Districts", "Ohio Senate Districts", "US House Districts", "Cities",
];
const defaultAreaOption = areaOptions[0];

const scoreOptions = [
  "All Elections", "Primary Elections", "General Elections", "Special Elections",
];
const defaultScoreOption = scoreOptions[0];

export default class AgeInfluences extends Component {
    state = {
        stateHouseStats : null,
        stateSenateStats: null,
        congressionalStats: null,
        cityStats: null,
        selectedArea: null,
        selectedScore : null,
    }

    componentDidMount() {
        firebaseDatabase.ref(`summaryStats/stateHouseDistricts`).once('value').then(snapshot => snapshot.val()).then(data => this.setState({stateHouseStats: getAgeInfluences(data, "Ohio House District: "), selectedArea: "stateHouseStats", selectedScore: "score"}))
        firebaseDatabase.ref(`summaryStats/stateSenateDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({stateSenateStats: getAgeInfluences(stats, "Ohio Senate District: ")}));
        firebaseDatabase.ref(`summaryStats/congressionalDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({congressionalStats: getAgeInfluences(stats, "US House District: ")}));
        firebaseDatabase.ref(`summaryStats/cities`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({cityStats: getAgeInfluences(stats, "City: ")}));
    }

    render() {
      const changeAreaElements = (val) => {
        if (val === "Cities") {
          this.setState({selectedArea : "cityStats"});
        } else if (val === "Ohio House Districts") {
          this.setState({selectedArea : "stateHouseStats"});
        } else if (val === "Ohio Senate Districts") {
          this.setState({selectedArea : "stateSenateStats"});
        } else {
          this.setState({selectedArea : "congressionalStats"});
        }
      };

      const changeScoreElements = (val) => {
        if (val === "All Elections") {
          this.setState({selectedScore : "score"});
        } else if (val === "Primary Elections") {
          this.setState({selectedScore : "primary"});
        } else if (val === "General Elections") {
          this.setState({selectedScore : "general"});
        } else {
          this.setState({selectedScore : "special"});
        }
      };

      const getSelected = () => {
        if (this.state.selectedArea === "cityStats") {
          return this.state.cityStats;
        } else if (this.state.selectedArea === "stateHouseStats") {
          return this.state.stateHouseStats;
        } else if (this.state.selectedArea === "stateSenateStats") {
          return this.state.stateSenateStats;
        } else {
          return this.state.congressionalStats;
        }
      };
      return (
        <>
          <div
              style={{width:'55%', paddingRight:'5%', paddingBottom:"75px", paddingLeft:"5%", height: "calc(43vh - 150px)", position:"fixed", right:"0", top:"75"}}
          >

          {this.state.selectedArea && this.state.selectedScore && <ResponsiveBar
            data={getSelected()}
            keys={[ "age" ]}
            indexBy="_id"
            margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'linear', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Average Age',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={40}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />}

        {this.state.selectedArea && this.state.selectedScore && <ResponsiveBar
            data={getSelected()}
            keys={[ "skew" ]}
            indexBy="_id"
            margin={{ top: 0, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={(d) => d.data.color}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Bipartisan Skew',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={40}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />}
        {this.state.selectedArea && this.state.selectedScore && <ResponsiveBar
            data={getSelected()}
            keys={[ this.state.selectedScore ]}
            indexBy="_id"
            margin={{ top: 0, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={"green"}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Election Turnout Score',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={40}
            labelSkipHeight={40}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />}
        <div style={{width: "80%", marginTop: -45, marginLeft: "25%", display:"flex", flexDirection:"horizontal"}}>
        <Dropdown style={{width:200}} options={areaOptions} onChange={(d) => changeAreaElements(d.label)} value={defaultAreaOption} placeholder="Select an option" />
        <Dropdown style={{width:200}} options={scoreOptions} onChange={(d) => changeScoreElements(d.label)} value={defaultScoreOption} placeholder="Select an option" />
        </div>
        </div>
        </>
    )};

}
