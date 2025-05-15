import { useEffect, useState } from "react";


export const LiveClock = ({ timeZone = 'Europe/Moscow' }: { timeZone?: string }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('ru-RU', {
          timeZone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone]);

  return <div>{time}</div>;
};