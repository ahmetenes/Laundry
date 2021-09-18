const axios = require('axios');
const { timeStamp } = require('console');
const database = require('../database/connection')

var sensor_data="";
var timer;
exports.sensorsController = (req,res) => {
    getData().then(sendData(res));
    
}
function sendData(responce) {
    responce.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*"
      });
    clearInterval(timer);
    timer = setInterval(() => {
        responce.write("\n\n");
        getData().then(res => {
            writeData(res.data);
            responce.write(`data: ${JSON.stringify(res.data)}`);            
    })
       
      }, 2000);
    
}
  async function getData(){
   return await axios.get('https://6144e495411c860017d256d3.mockapi.io/data');
      
  }
  async function writeData(data){
      database(async (client)=>{

        const date = new Date()
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const year = date.getFullYear().toString();
        const month = date.getMonth().toString();
        const day = date.getDay().toString();
        const datestr = year+"-"+month+"-"+day;
        const timestr = hour+":"+minute+":"+second;
        await data.map((item)=>{client.query(`INSERT INTO "Readings"(
            reading_id, reading_value, reading_date, reading_time, sensor_id)
            VALUES (DEFAULT, ${item.temperature.toPrecision(2)}, '${datestr}','${timestr}', ${item.sensor_data}),
                (DEFAULT, ${item.level.toPrecision(2)}, '${datestr}','${timestr}', ${item.sensor_data}),
                (DEFAULT, ${item.door}, '${datestr}','${timestr}', ${item.sensor_data});`),
                (err, res) => {
                    console.log(err, res);
                    client.end();
                  }})
      })
      console.log(`res.data`, data);

  }