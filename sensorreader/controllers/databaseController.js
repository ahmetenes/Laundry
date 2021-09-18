const axios = require('axios');
const { timeStamp } = require('console');
const database = require('../database/connection')

var sensor_data="";
var timer;
exports.databaseController = (data) => {
    writeData(data)
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
        await data.machineIds.map((id)=>{client.query(`INSERT INTO "Readings"(
            reading_id, reading_value, reading_date, reading_time, sensor_id)
            VALUES (DEFAULT, ${data.temperature[id]}, '${datestr}','${timestr}', ${id}),
                (DEFAULT, ${data.level[id]}, '${datestr}','${timestr}', ${id}),
                (DEFAULT, ${data.door[id]}, '${datestr}','${timestr}', ${id});`),
                (err, res) => {
                    console.log(err, res);
                    client.end();
                  }})
      })

  }