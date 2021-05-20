import React, {Component} from "react";
import TextSection from "../components/TextSection";
import Visualization from "../components/Visualization";
import { Waypoint } from 'react-waypoint';
import { zip } from "d3";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons";

export default class StoryTeller extends Component {
    state = {
      vizId : 1,
    }

    render () {
      return (
        <>

          <div style={{flexDirection:"row", display:"flex"}}>
              <div style={{width:'30%', marginBottom:'10vh', marginRight:'0', paddingLeft:'5%'}}>
              <Waypoint
                  onEnter={() => this.setState({vizId: -1})}
                  onEnter={() => this.setState({vizId: -1,})}
                  bottomOffset="49.9%"
                  topOffset="49.9%"
              >
                        <div style={{width:'50vw', height: "calc(120vh - 150px)", marginBottom:'0vh', marginRight:'0', paddingLeft:'20vw', paddingRight:"20vw", marginRight:"5vw"}}>
                            <TextSection textId={0} height={"50vh"} />
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#bbb",
                                fontSize: 50
                            }}>
                                <p>
                                    <FontAwesomeIcon icon={faAngleDoubleDown} />
                                </p>
                            </div>
                        </div>
              </Waypoint>
                  <Waypoint
                      onEnter={() => this.setState({vizId: 0,})}
                      bottomOffset="49.9%"
                      topOffset="49.9%"
                  >
                      <div><TextSection textId={1} height={"60vh"} /></div>
                  </Waypoint>

                  <Waypoint
                      onEnter={() => this.setState({vizId: 1,})}
                      bottomOffset="49.9%"
                      topOffset="49.9%"
                  >
                      <div><TextSection textId={2} height={"100vh"} /></div>
                  </Waypoint>

                  <Waypoint
                      onEnter={() => this.setState({vizId: 2,})}
                      bottomOffset="49.9%"
                      topOffset="49.9%"
                  >
                      <div><TextSection textId={3} height={"50vh"} height={"100vh"} /></div>
                  </Waypoint>
              </div>
              <div id="container">
                <Visualization vizId={this.state.vizId} />
              </div>
          </div>
        </>

    )};


}
