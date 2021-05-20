import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {useState, useEffect} from 'react';
import {ResponsiveBar} from '@nivo/bar'
import * as d3 from "d3";
import {firebaseDatabase, getAgeInfluences} from '../utils/data'

import "../App.css";
import {callbackify} from "util";

const areaOptions = [
    "Ohio House Districts", "Ohio Senate Districts", "US House Districts"
];
const defaultAreaOption = areaOptions[0];

const scoreOptions = [
    "All Elections", "Primary Elections", "General Elections", "Special Elections",
];
const defaultScoreOption = scoreOptions[0];

export default class AgeInfluences extends Component {
    state = {
        stateHouseStats: null,
        stateSenateStats: null,
        congressionalStats: null,
        cityStats: null,
        selectedArea: null,
        selectedScore: null,
        hoveringOver: null,
    }

    componentDidMount() {
        firebaseDatabase.ref(`summaryStats/stateHouseDistricts`).once('value').then(snapshot => snapshot.val()).then(data => this.setState({
            stateHouseStats: getAgeInfluences(data, "Ohio House District: "),
            selectedArea: "stateHouseStats",
            selectedScore: "score"
        }))
        firebaseDatabase.ref(`summaryStats/stateSenateDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({stateSenateStats: getAgeInfluences(stats, "Ohio Senate District: ")}));
        firebaseDatabase.ref(`summaryStats/congressionalDistricts`).once('value').then(snapshot => snapshot.val()).then(stats => this.setState({congressionalStats: getAgeInfluences(stats, "US House District: ")}));
    }

    render() {
        const changeAreaElements = (val) => {
            if (val === "Cities") {
                this.setState({selectedArea: "cityStats"});
            } else if (val === "Ohio House Districts") {
                this.setState({selectedArea: "stateHouseStats"});
            } else if (val === "Ohio Senate Districts") {
                this.setState({selectedArea: "stateSenateStats"});
            } else {
                this.setState({selectedArea: "congressionalStats"});
            }
        };

        const changeScoreElements = (val) => {
            if (val === "All Elections") {
                this.setState({selectedScore: "score"});
            } else if (val === "Primary Elections") {
                this.setState({selectedScore: "primary"});
            } else if (val === "General Elections") {
                this.setState({selectedScore: "general"});
            } else {
                this.setState({selectedScore: "special"});
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
                    style={{
                        width: '55%',
                        paddingRight: '5%',
                        paddingBottom: "75px",
                        paddingLeft: "5%",
                        height: "calc(43vh - 150px)",
                        position: "fixed",
                        right: "0",
                        top: "75"
                    }}
                >
                    <div style={{marginBottom: 20, zIndex: 100}}>
                        Age and Voter Behavior
                    </div>
                    {this.state.selectedArea && this.state.selectedScore &&
                    <>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginBottom: 20
                        }}>
                            <Dropdown style={{width: 200}}
                                      options={areaOptions}
                                      controlClassName="dropdown"
                                      menuClassName="dropdown-menu"
                                      onChange={(d) => changeAreaElements(d.label)} value={defaultAreaOption}
                                      placeholder="Select an option"/>
                            <Dropdown style={{width: 200}}
                                      options={scoreOptions}
                                      controlClassName="dropdown"
                                      menuClassName="dropdown-menu"
                                      onChange={(d) => changeScoreElements(d.label)} value={defaultScoreOption}
                                      placeholder="Select an option"/>
                        </div>
                        <ResponsiveBar
                            data={getSelected()}
                            keys={["age"]}
                            indexBy="_id"
                            margin={{top: 10, right: 60, bottom: 10, left: 60}}
                            padding={0.3}
                            valueScale={{type: 'linear'}}
                            indexScale={{type: 'linear', round: true}}
                            colors={(d) => {return d.index === this.state.hoveringOver ? "#FFD700" : "#A32CC4"}}
                            borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                            axisTop={null}
                            axisRight={null}
                            onMouseEnter={(_data, event) => {
                              this.setState({hoveringOver: _data.index});
                            }}
                            onMouseLeave={(_data, event) => {
                              this.setState({hoveringOver: null});
                            }}
                            axisBottom={null}
                            tooltip={(node) => (
                              <div
                                  style={{
                                      color: "white",
                                      background: 'rgb(204,204,204,1)',
                                      padding: '12px 16px',
                                  }}
                              >
                                  <strong>
                                      {node.data.type} {node.data._id}
                                  </strong>
                                  <br/>
                                  {`Average Age: ${node.data.age}`}
                              </div>
                          )}
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
                            labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}/>
                    </>
                    }

                    {this.state.selectedArea && this.state.selectedScore &&
                    <ResponsiveBar
                        data={getSelected()}
                        keys={["skew"]}
                        indexBy="_id"
                        margin={{top: 10, right: 60, bottom: 10, left: 60}}
                        padding={0.3}
                        valueScale={{type: 'linear'}}
                        indexScale={{type: 'band', round: true}}
                        colors={(d) => {return d.index === this.state.hoveringOver ? "#FFD700" : d.data.color}}
                        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={null}
                        onMouseEnter={(_data, event) => {
                          this.setState({hoveringOver: _data.index});
                        }}
                        onMouseLeave={(_data, event) => {
                          this.setState({hoveringOver: null});
                        }}
                        tooltip={(node) => (
                          <div
                              style={{
                                  color: "white",
                                  background: 'rgb(204,204,204,1)',
                                  padding: '12px 16px',
                              }}
                          >
                              <strong>
                                  {node.data.type} {node.data._id}
                              </strong>
                              <br/>
                              {`Average Age: ${node.data.age}`}
                              <br/>
                              {`Bipartisan Skew: ${node.data.skew}`}
                          </div>
                      )}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Bipartisan Skew',
                            legendPosition: 'middle',
                            legendOffset: -50
                        }}
                        labelSkipWidth={40}
                        labelSkipHeight={12}
                        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}/>
                    }
                    {this.state.selectedArea && this.state.selectedScore &&
                    <ResponsiveBar
                        data={getSelected()}
                        keys={[this.state.selectedScore]}
                        indexBy="_id"
                        margin={{top: 10, right: 60, bottom: 10, left: 60}}
                        padding={0.3}
                        valueScale={{type: 'linear'}}
                        indexScale={{type: 'band', round: true}}
                        colors={(d) => {return d.index === this.state.hoveringOver ? "#FFD700" : "#03C04A"}}
                        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={null}
                        onMouseEnter={(_data, event) => {
                          this.setState({hoveringOver: _data.index});
                        }}
                        onMouseLeave={(_data, event) => {
                          this.setState({hoveringOver: null});
                        }}
                        tooltip={(node) => (
                          <div
                              style={{
                                  color: "white",
                                  background: 'rgb(204,204,204,1)',
                                  padding: '12px 16px',
                              }}
                          >
                              <strong>
                                  {node.data.type} {node.data._id}
                              </strong>
                              <br/>
                              {`Average Age: ${node.data.age}`}
                              <br/>
                              {`Engagement Score: ${node.data[this.state.selectedScore]}`}
                          </div>
                      )}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Election Engagement Score',
                            legendPosition: 'middle',
                            legendOffset: -50
                        }}
                        labelSkipWidth={40}
                        labelSkipHeight={40}
                        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                    />
                    }
                </div>
            </>
        )
    };

}
