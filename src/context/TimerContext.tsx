import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface Timer {
  id: number;
  name: string;
  duration: number; // в секундах
  timeLeft: number;
  isRunning: boolean;
  overtime: number; // Время, прошедшее после окончания таймера
}

interface TimerContextType {
  timers: Timer[];
  addTimer: (name: string, duration: number) => void;
  toggleTimer: (id: number) => void;
  resetTimer: (id: number) => void;
  deleteTimer: (id: number) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimers = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimers должен использоваться внутри TimerProvider');
  }
  return context;
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>([]);

  // Обновление таймеров каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((currentTimers) =>
        currentTimers.map((timer) => {
          if (!timer.isRunning) return timer;

          // Если таймер уже закончился, увеличиваем overtime
          if (timer.timeLeft === 0) {
            return { ...timer, overtime: (timer.overtime || 0) + 1 };
          }

          const newTimeLeft = Math.max(0, timer.timeLeft - 1);

          // Если таймер только что закончился
          if (newTimeLeft === 0 && timer.timeLeft > 0) {
            return { ...timer, timeLeft: 0, overtime: 0 };
          }

          return { ...timer, timeLeft: newTimeLeft };
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = useCallback((name: string, duration: number) => {
    const durationInSeconds = duration * 60;
    setTimers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        duration: durationInSeconds,
        timeLeft: durationInSeconds,
        isRunning: false,
        overtime: 0,
      },
    ]);
  }, []);

  const toggleTimer = useCallback((id: number) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id
          ? {
              ...timer,
              isRunning: !timer.isRunning,
              timeLeft: timer.timeLeft === 0 ? timer.duration : timer.timeLeft,
              overtime: timer.timeLeft === 0 ? 0 : timer.overtime,
            }
          : timer,
      ),
    );
  }, []);

  const resetTimer = useCallback((id: number) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id
          ? { ...timer, timeLeft: timer.duration, isRunning: false, overtime: 0 }
          : timer,
      ),
    );
  }, []);

  const deleteTimer = useCallback((id: number) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id));
  }, []);

  return (
    <TimerContext.Provider
      value={{
        timers,
        addTimer,
        toggleTimer,
        resetTimer,
        deleteTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
