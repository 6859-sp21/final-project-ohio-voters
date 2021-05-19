import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState, useEffect } from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import * as d3 from "d3";
import {firebaseDatabase,  getBipartisanStats} from '../utils/data'

import "../App.css";
import { callbackify } from "util";

const options = [
  "Ohio House Districts", "Ohio Senate Districts", "US House Districts", "Cities",
];
const defaultOption = options[0];

export default class BipartisanBubble extends Component {
    state = {
        stateHouseStats : null,
        stateSenateStats: null,
        congressionalStats: null,
        cityStats: null,
        selected: null,
        labelSkip: 10,

    }

    componentDidMount() {
        firebaseDatabase.ref(`summaryStats/stateHouseDistricts`).once('value').then(snapshot => snapshot.val()).then(data => this.setState({stateHouseStats: getBipartisanStats(data, "Ohio House District: "), selected: "stateHouseStats"}))
        firebaseDatabase.ref(`summaryStats/stateSenateDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({stateSenateStats: getBipartisanStats(stats, "Ohio Senate District: ")}));
        firebaseDatabase.ref(`summaryStats/congressionalDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({congressionalStats: getBipartisanStats(stats, "US House District: ")}));
        firebaseDatabase.ref(`summaryStats/cities`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({cityStats: getBipartisanStats(stats, "City: ")}));
    }


    render() {
        const changeElements = (val) => {
          if (val === "Cities") {
            this.setState({selected : "cityStats"});
            this.setState({labelSkip : 25});
          } else if (val === "Ohio House Districts") {
            this.setState({selected : "stateHouseStats"});
            this.setState({labelSkip : 10});
          } else if (val === "Ohio Senate Districts") {
            this.setState({selected : "stateSenateStats"});
            this.setState({labelSkip : 10});
          } else {
            this.setState({selected : "congressionalStats"});
            this.setState({labelSkip : 10});
          }
          console.log("Left Change Elements");
        };

        const getSelected = () => {
          console.log("Entered getSelected");
          if (this.state.selected === "cityStats") {
            console.log("Left getSelected");
            return this.state.cityStats;
          } else if (this.state.selected === "stateHouseStats") {
            return this.state.stateHouseStats;
          } else if (this.state.selected === "stateSenateStats") {
            return this.state.stateSenateStats;
          } else {
            return this.state.congressionalStats;
          }
        };
        return (
          <>
            <div
                style={{width:'55%', paddingRight:'5%', paddingBottom:"75px", paddingLeft:"5%", height: "calc(100vh - 150px)", position:"fixed", right:"0", top:"75"}}
            >
              <div style={{marginBottom:-85, paddingTop:50, zIndex:100}}> Bipartisan Leans for Ohio AAPIs</div>
              {this.state.selected && <ResponsiveCirclePacking
                data={getSelected()}
                margin={0}
                id="_id"
                value="value"
                colors={(d) => {return d.data.color}}
                childColor={{ from: 'color', modifiers: [ [ 'brighter', 0.4 ] ] }}
                colorBy={d => d.color}
                padding={4}
                enableLabels={true}
                labelsFilter={function(e){return 2===e.node.depth}}
                labelsSkipRadius={this.state.labelSkip}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.5 ] ] }}
                tooltip={(input) => (
                  <>
                    {input.data.value &&
                    <div id="container" style={{backgroundColor: 'rgba(256, 256, 256, 0.4)', padding:"0.25em"}}>
                      <p style={{lineHeight:0}}>{input.data.type}{input.data._id}</p>
                      <p style={{lineHeight:0}}>{input.data.skew}</p>
                      <p style={{lineHeight:0}}>Population: {input.data.population}</p>
                    </div>
                    }

                    {!input.data.value &&
                    <div id="container" style={{backgroundColor: 'rgba(256, 256, 256, 0.4)', padding:"0.25em"}}>
                      <p style={{lineHeight:0}}>{input.data._id}</p>
                    </div>}
                  </>
                )}
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'none',
                        color: "hsl(192, 70%, 50%)",
                        rotation: -45,
                        lineWidth: 0,
                        spacing: 0,
                        opacity: 0
                    }
                ]}
                fill={[ { match: { depth: 0 }, id: 'lines' } ]}
              />}
              <div style={{width: "50%", marginTop: -85, marginLeft: "25%"}}>
              <Dropdown options={options} onChange={(d) => changeElements(d.label)} value={defaultOption} placeholder="Select an option" />
              </div>
            </div>
          </>
        );
    }

}
