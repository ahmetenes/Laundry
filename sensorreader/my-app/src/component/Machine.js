import React, { Component } from 'react'
import './Machine.css'
export default class Machine extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    setState(){

    }
    render() {
        const itemdata= this.props.data;
        console.log(`item:`, itemdata);
        const isOpen=itemdata.door==1;
        return (
        <div id="container" className={isOpen?"open":"close"}>
            <p>Machine #{itemdata.sensor_data}</p>
            <ul>
                <li key="temp">{itemdata.temperature}C</li>
                <li key="level">{Math.round(itemdata.level*100)}%</li>
            </ul>
        </div>
        )
    }
}


