const express = require('express');
const http = require('http');
const axios = require('axios');
const socketio = require('socket.io');
const { databaseController } = require('./controllers/databaseController');
const app = express();

//
async function getData(){
    return await axios.get('https://6144e495411c860017d256d3.mockapi.io/data/1');
}

const server = http.createServer(app);
const io = new socketio.Server(server,{
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})

io.on("connection", socket => {
    console.log(`new client connected`, socket.id)

    socket.on("initial data", ()=>{
        console.log(`client wanted data`);
        getData().then((data)=>{
            console.log(`data`, data)
            io.sockets.emit("get data",data.data)
        })
        setInterval(
            ()=>{
                getData().then((data)=>{
                    console.log('Fetching data')
                    io.sockets.emit("get data",data.data)
                    databaseController(data.data);
                })
                
            }
            ,2000);
    })
    
})


server.listen(3001,function(){
    console.log("express server listening port 3001");
})