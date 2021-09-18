import React, { Component } from 'react'
import './Machine.css'
export default class Machine extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render() {
        const itemdata= this.props.data;
        const id =this.props.id;
        const isOpen = itemdata.door[id] === 1;
        return (
        <div id="container" className={isOpen?"open":"close"}>
            <p>Machine #{id}</p>
            <ul>
                <li key="temp">{itemdata.temperature[id]}C</li>
                <li key="level">{Math.round(itemdata.level[id]*100)}%</li>
            </ul>
        </div>
        )
    }
}


