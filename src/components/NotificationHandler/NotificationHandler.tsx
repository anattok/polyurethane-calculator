import { useEffect, useRef, useState } from 'react';
import { useTimers } from '../../context/TimerContext';
import timerSound from '../../assets/music.mp3';
import { Toast } from '../ui/Toast/Toast';

interface ToastMessage {
  id: number;
  message: string;
}

export const NotificationHandler = () => {
  const { timers } = useTimers();
  const prevTimersRef = useRef(timers);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeToasts, setActiveToasts] = useState<ToastMessage[]>([]);

  // Check for timer completions and show notifications
  useEffect(() => {
    const prevTimers = prevTimersRef.current;

    const showToastNotification = (timer: { name: string; id: number }) => {
      setActiveToasts((prev: ToastMessage[]) => [
        ...prev,
        {
          id: timer.id,
          message: `Таймер "${timer.name}" завершен!`,
        },
      ]);
    };

    const playSound = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
        }
      } catch (error) {
        console.error('Error playing sound:', error);
        setActiveToasts((prev: ToastMessage[]) => [
          ...prev,
          {
            id: Date.now(),
            message: 'Не удалось воспроизвести звук уведомления',
          },
        ]);
      }
    };

    timers.forEach((timer) => {
      const prevTimer = prevTimers.find((t) => t.id === timer.id);

      // Check for timer completion
      if (prevTimer && prevTimer.timeLeft > 0 && timer.timeLeft === 0) {
        // Try to play sound first
        playSound();
        // Show toast notification
        showToastNotification(timer);
      }
    });

    prevTimersRef.current = timers;
  }, [timers]);

  const handleCloseToast = (toastId: number) => {
    setActiveToasts((prev: ToastMessage[]) => prev.filter((toast) => toast.id !== toastId));
  };

  return (
    <>
      <audio ref={audioRef} src={timerSound} preload="auto" />
      {activeToasts.map((toast: ToastMessage) => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={5000}
          onClose={() => handleCloseToast(toast.id)}
        />
      ))}
    </>
  );
};
