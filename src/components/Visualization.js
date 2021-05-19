import React, {Component} from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState, useEffect } from 'react';
import { ResponsiveCirclePacking } from '@nivo/circle-packing';
import * as d3 from "d3";
import {firebaseDatabase} from '../utils/data';
import BipartisanBubble from "../components/BipartisanBubble"

import "../App.css";
import { callbackify } from "util";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export default class Visualization extends Component {

    render() {
      return (
        <BipartisanBubble />
      )
    }

}
