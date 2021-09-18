let changeStarted = false;
let interval;
const startStop = document.getElementById('start-stop');

const changer = () => {
  const data = {
    temperature: 200.67,
    level: 0.76,
    door: false,
  };
  if (changeStarted) {
    clearInterval(interval);
    changeStarted = false;
    return;
  }
  interval = setInterval(() => {
    changeStarted = true;
    for (let i = 1; i <= 20; i += 1) {
      data.temperature = Math.round(Math.random() * 100.0); // 0-100
      data.level = Math.round(Math.random() * 100.0) / 100.0; // already percentage
      data.door = Math.round(Math.random()); // true-false
      fetch(`https://6144e495411c860017d256d3.mockapi.io/data/${i}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
  }, 2000);
};
startStop.addEventListener('click', () => {
  changer();
  startStop.innerText = (startStop.innerText === 'Stop') ? 'Start' : 'Stop';
});
