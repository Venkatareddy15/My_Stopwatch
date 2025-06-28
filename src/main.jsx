import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resumeTimer = () => setIsRunning(true);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>{time}s</p>
      {!isRunning && time > 0 && (
        <button onClick={resumeTimer} disabled={isRunning || time > 0}>
          Resume
        </button>
      )}
      {isRunning ? (
        <button onClick={pauseTimer}>Pause</button>
      ) : (
        <button onClick={startTimer} disabled={time > 0}>
          Start
        </button>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
