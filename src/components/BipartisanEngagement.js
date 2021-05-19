import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState, useEffect } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import * as d3 from "d3";
import {firebaseDatabase,  getBipartisanEngagement} from '../utils/data'

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

export default class BipartisanEngagement extends Component {
    state = {
        stateHouseStats : null,
        stateSenateStats: null,
        congressionalStats: null,
        cityStats: null,
        selectedArea: null,
        selectedScore : null,

    }

    componentDidMount() {
        firebaseDatabase.ref(`summaryStats/stateHouseDistricts`).once('value').then(snapshot => snapshot.val()).then(data => this.setState({stateHouseStats: getBipartisanEngagement(data, "Ohio House District: "), selectedArea: "stateHouseStats", selectedScore: "Score"}))
        firebaseDatabase.ref(`summaryStats/stateSenateDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({stateSenateStats: getBipartisanEngagement(stats, "Ohio Senate District: ")}));
        firebaseDatabase.ref(`summaryStats/congressionalDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({congressionalStats: getBipartisanEngagement(stats, "US House District: ")}));
        firebaseDatabase.ref(`summaryStats/cities`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({cityStats: getBipartisanEngagement(stats, "City: ")}));
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
          this.setState({selectedScore : "Score"});
        } else if (val === "Primary Elections") {
          this.setState({selectedScore : "Primary"});
        } else if (val === "General Elections") {
          this.setState({selectedScore : "General"});
        } else {
          this.setState({selectedScore : "Special"});
        }
      };

      const getSelected = () => {
        if (this.state.selectedArea === "cityStats") {
          return this.state.cityStats[this.state.selectedScore];
        } else if (this.state.selectedArea === "stateHouseStats") {
          return this.state.stateHouseStats[this.state.selectedScore];
        } else if (this.state.selectedArea === "stateSenateStats") {
          return this.state.stateSenateStats[this.state.selectedScore];
        } else {
          return this.state.congressionalStats[this.state.selectedScore];
        }
      };
      if (this.state.cityStats) {
            console.log(this.state.cityStats["Special"]);
      }
      return (
        <div
            style={{width:'55%', paddingRight:'5%', paddingBottom:"75px", paddingLeft:"5%", height: "calc(100vh - 150px)", position:"fixed", right:"0", top:"75"}}
        >
        <div style={{marginBottom:-45, paddingTop:0, zIndex:100}}> Bipartisan Relationships with Ohio AAPI Voter Turnout</div>
        {this.state.selectedArea && this.state.selectedScore && <ResponsiveScatterPlot
            animate={(this.state.selectedArea === 'cityStats') ? false : true}
            data={getSelected()}
            colors = {(d) => d.color}
            style={{color:"white"}}
            nodeSize = {12}
            margin={{ top: 100, right: 100, bottom: 150, left: 100 }}
            xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            xFormat={function(e){return e}}
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            yFormat={function(e){return e}}
            blendMode="multiply"
            axisTop={null}
            axisFormat={{color:"white"}}
            tooltip={({ node }) => (
            <div
                style={{
                    color: node.style.color,
                    background: '#333',
                    padding: '12px 16px',
                }}
            >
                <strong>
                    {node.data.type} {node.data._id}
                </strong>
                <br />
                {`Bipartisan Skew: ${node.data.x}`}
                <br />
                {`Engagement: ${node.data.y.toFixed(3)}`}
                </div>
            )}
            axisRight={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}

            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Bipartisan Skew',
                legendPosition: 'middle',
                legendOffset: 46
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Average Voter Engagement Score',
                legendPosition: 'middle',
                legendOffset: -60
            }}
          />}
          <div style={{width: "80%", marginTop: -85, marginLeft: "25%", display:"flex", flexDirection:"horizontal"}}>
          <Dropdown style={{width:200}} options={areaOptions} onChange={(d) => changeAreaElements(d.label)} value={defaultAreaOption} placeholder="Select an option" />
          <Dropdown style={{width:200}} options={scoreOptions} onChange={(d) => changeScoreElements(d.label)} value={defaultScoreOption} placeholder="Select an option" />
          </div>
          </div>
    )};

}
