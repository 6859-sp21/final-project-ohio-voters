import React, {Component} from "react";
import TextSection from "../components/TextSection";
import Visualization from "../components/Visualization";
import { Waypoint } from 'react-waypoint';
import { zip } from "d3";


export default class StoryTeller extends Component {
    state = {
      vizId : 0,
    }

    render () {
      return (
        <>
          <div style={{flexDirection:"row", display:"flex"}}>
              <div style={{width:'30%', marginBottom:'10vh', marginRight:'0', paddingLeft:'5%'}}>
                  <Waypoint
                      onEnter={() => this.setState({vizId: 0,})}
                      bottomOffset="30%"
                      topOffSet="30%"
                  >
                      <div><TextSection textId={0} /></div>
                  </Waypoint>

                  <Waypoint
                      onEnter={() => this.setState({vizId: 1,})}
                      bottomOffset="30%"
                      topOffset="30%"
                  >
                      <div><TextSection textId={1} /></div>
                  </Waypoint>

                  <Waypoint
                      onEnter={() => this.setState({vizId: 2,})}
                      bottomOffset="30%"
                      topOffset="30%"
                  >
                      <div><TextSection textId={2} /></div>
                  </Waypoint>
              </div>

              <Visualization vizId={this.state.vizId} />
          </div>
        </>

    )};


}
