import React, { useState, useEffect } from 'react'
import './App.css';
import Machine from './component/Machine'


function App() {
  const [Sensors, setSensors] = useState([])
  useEffect(() => {
    const sse = new EventSource("http://localhost:3001/sensors");
    function getRealtimeData(data) {
      setSensors(data)
    }
    sse.onmessage= e => getRealtimeData(JSON.parse(e.data))
  
    sse.onerror = () => {
      sse.close();
    }
    return ()=>{
      sse.close();
    };
  }, []);
  return (
    <div id = "app-container">
        {Sensors.map((sensor)=><Machine key={sensor.sensor_id} data={sensor}/>)}
    </div>
  )
}
export default App;

