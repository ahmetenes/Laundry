import React, { useState, useEffect } from 'react'
import './App.css';
import Machine from './component/Machine'
import { Header, socket } from './global/Header';

function App() {

  const [data, setData] = useState({})
  
  //Works one time
  useEffect(() => {
    console.log(`data`, data)
    socket.emit('initial data');
    socket.on('get data',(sensordata)=>{
      console.log('reading data' )
      setData({...sensordata});
    })
  }, []);
  return (
    <div id = "app-container">
      <Header/>
      {data.machineIds && data.machineIds.map((id)=>{return <Machine key={id} id={id} data={data}/>})}
    </div>
  )
}
 
export default App;

