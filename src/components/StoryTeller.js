import React, { useState } from "react";
import TextSection from "../components/TextSection";
import Visualization from "../components/Visualization";
import { Waypoint } from 'react-waypoint';
import { zip } from "d3";

export default function StoryTeller(props) {
    const text = props.textId;
    const [viz, setViz] = useState(0);

    return (
        <>  
        <div style={{flexDirection:"row", display:"flex"}}>
            <div style={{width:'30%', marginBottom:'10vh', marginRight:'0', paddingLeft:'5%'}}>            
                <Waypoint
                    onEnter={() => {console.log("1")}}

                >
                    <div><TextSection textId={0} /></div>
                </Waypoint>

                <Waypoint
                    onEnter={() => console.log("2")}
                >
                    <div><TextSection textId={0} /></div>
                </Waypoint>
            </div>
            
            <Visualization vizId={0} />
        </div>
        </>

    );
    

}