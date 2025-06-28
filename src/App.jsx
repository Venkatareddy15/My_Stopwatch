import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [theme, setTheme] = useState('light');
  const timerRef = useRef(null);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('stopwatchState'));
    if (savedState) {
      setTime(savedState.time);
      setLaps(savedState.laps);
      setTheme(savedState.theme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'stopwatchState',
      JSON.stringify({ time, laps, theme })
    );
  }, [time, laps, theme]);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const pauseStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
  };

  const resumeStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const recordLap = () => {
    if (isRunning) {
      const lapTime = laps.length > 0 ? time - laps[laps.length - 1].totalTime : time;
      setLaps((prevLaps) => [...prevLaps, { lapNumber: prevLaps.length + 1, lapTime, totalTime: time }]);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className={`stopwatch ${theme}`}>
      <h1>⏱️ SkillCraft Stopwatch ⏱️</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startStopwatch} disabled={isRunning}>Start</button>
        <button onClick={pauseStopwatch} disabled={!isRunning}>Pause</button>
        <button onClick={resumeStopwatch} disabled={isRunning || time === 0}>
          Resume
        </button>
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="laps">
        <h2>Lap Times</h2>
        <table>
          <thead>
            <tr>
              <th>Lap Number</th>
              <th>Lap Time</th>
              <th>Total Time</th>
            </tr>
          </thead>
          <tbody>
            {laps.map((lap) => (
              <tr key={lap.lapNumber}>
                <td>{lap.lapNumber}</td>
                <td>{formatTime(lap.lapTime)}</td>
                <td>{formatTime(lap.totalTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
