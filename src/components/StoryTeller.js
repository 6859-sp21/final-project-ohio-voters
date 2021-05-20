import React, {Component} from "react";
import TextSection from "../components/TextSection";
import Visualization from "../components/Visualization";
import { Waypoint } from 'react-waypoint';
import { zip } from "d3";

export default class StoryTeller extends Component {
    state = {
      vizId : 1,
    }

    // <div style={{width:'100%', height: "calc(100vh - 150px)", marginBottom:'10vh', marginRight:'0', paddingLeft:'5%'}}>
    //     Enter your introduction here!
    // </div>

    render () {
      return (
        <>
          <div style={{flexDirection:"row", display:"flex"}}>
              <div style={{width:'30%', marginBottom:'10vh', marginRight:'0', paddingLeft:'5%'}}>
                  <Waypoint
                      onEnter={() => this.setState({vizId: 1,})}
                      bottomOffset="49.9%"
                      topOffset="49.9%"
                  >
                      <div><TextSection textId={0} /></div>
                  </Waypoint>

                  <Waypoint
                      onEnter={() => this.setState({vizId: 2,})}
                      bottomOffset="49.9%"
                      topOffset="49.9%"
                  >
                      <div><TextSection textId={1} /></div>
                  </Waypoint>

                  <Waypoint
                      onEnter={() => this.setState({vizId: 3,})}
                      bottomOffset="49.9%"
                      topOffset="49.9%"
                  >
                      <div><TextSection textId={2} /></div>
                  </Waypoint>
              </div>
              <div id="container">
                <Visualization vizId={this.state.vizId} />
              </div>
          </div>
        </>

    )};


}
