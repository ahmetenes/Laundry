import React, { Component } from 'react'
import {io} from 'socket.io-client'
var socket;
class Header extends Component {
    constructor(){
        super()
        this.state={
            host:"http://localhost:3001/" //server is on
        }
        
        socket = io(this.state.host);
    }
    render() {
        return (
            <header>

            </header>
        )
    }
}

export {Header, socket};

