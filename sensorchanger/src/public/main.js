let changeStarted = false;
let interval;
const startStop = document.getElementById('start-stop');

const changer = () => {
  if (changeStarted) {
    clearInterval(interval);
    changeStarted = false;
    return;
  }
  interval = setInterval(() => {
    changeStarted = true;
    const temperature = [];
    const level = [];
    const door = [];
    const machineIds = [];
    for (let i = 1; i <= 20; i += 1) {
      temperature.push(Math.round(Math.random() * 100.0)); // 0-100
      level.push(Math.round(Math.random() * 100.0) / 100.0); // already percentage
      door.push(Math.round(Math.random())); // 0-1
      machineIds.push(i);
    }
    fetch('https://6144e495411c860017d256d3.mockapi.io/data/1', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        temperature,
        level,
        door,
        machineIds,
      }),
    });
  }, 2000);
};
startStop.addEventListener('click', () => {
  changer();
  startStop.innerText = (startStop.innerText === 'Stop') ? 'Start' : 'Stop';
});
