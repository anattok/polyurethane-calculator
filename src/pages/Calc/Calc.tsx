import { useState, useEffect } from 'react';

export const Calc = () => {
  const [time, setTime] = useState(60); // Initial time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, time]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(60);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="text-6xl font-bold mb-6 text-center">{formatTime(time)}</div>
        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
