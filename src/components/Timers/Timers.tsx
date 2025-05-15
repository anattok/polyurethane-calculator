import { useState, useRef } from 'react';
import s from './Timers.module.css';
import { Button } from '../ui/Button/Button';
import { Toast } from '../ui/Toast/Toast';
import timerSound from '../../assets/music.mp3';

interface Timer {
  id: number;
  name: string;
  duration: number; // в секундах
  timeLeft: number;
  isRunning: boolean;
}

interface TimersProps {
  timers: Timer[];
  onAddTimer: (name: string, duration: number) => void;
  onToggleTimer: (id: number) => void;
  onResetTimer: (id: number) => void;
  onDeleteTimer: (id: number) => void;
}

const Timers = ({
  timers,
  onAddTimer,
  onToggleTimer,
  onResetTimer,
  onDeleteTimer,
}: TimersProps) => {
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerDuration, setNewTimerDuration] = useState('');
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
  const [prevTimers, setPrevTimers] = useState<Timer[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAddTimer = () => {
    if (!newTimerName || !newTimerDuration) return;

    const duration = parseInt(newTimerDuration);
    onAddTimer(newTimerName, duration);
    setNewTimerName('');
    setNewTimerDuration('');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Check if any timer has just finished
  timers.forEach((timer) => {
    const prevTimer = prevTimers.find((t) => t.id === timer.id);
    if (prevTimer && prevTimer.timeLeft > 0 && timer.timeLeft === 0) {
      setToast({ message: `Таймер "${timer.name}" завершен!`, id: Date.now() });
      // Play sound when timer ends
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error('Error playing sound:', error);
        });
      }
    }
  });

  // Update prevTimers after checking
  if (JSON.stringify(prevTimers) !== JSON.stringify(timers)) {
    setPrevTimers(timers);
  }

  return (
    <div className={s.timersContainer}>
      <audio ref={audioRef} src={timerSound} preload="auto" />

      <div className={s.addTimerForm}>
        <input
          type="text"
          value={newTimerName}
          onChange={(e) => setNewTimerName(e.target.value)}
          placeholder="Название таймера"
          className={s.input}
        />
        <input
          type="number"
          value={newTimerDuration}
          onChange={(e) => setNewTimerDuration(e.target.value)}
          placeholder="Минуты"
          className={s.input}
          min="1"
        />
        <Button onClick={handleAddTimer} color="primary" size="medium">
          Добавить таймер
        </Button>
      </div>

      <div className={s.timersList}>
        {timers.map((timer) => (
          <div key={timer.id} className={s.timerCard}>
            <div className={s.timerInfo}>
              <h3>{timer.name}</h3>
              <div className={s.time}>{formatTime(timer.timeLeft)}</div>
            </div>
            <div className={s.timerControls}>
              <Button onClick={() => onToggleTimer(timer.id)} color="primary" size="small">
                {timer.isRunning ? 'Пауза' : timer.timeLeft === 0 ? 'Перезапуск' : 'Старт'}
              </Button>
              <Button onClick={() => onResetTimer(timer.id)} color="secondary" size="small">
                Сброс
              </Button>
              <Button onClick={() => onDeleteTimer(timer.id)} color="danger" size="small">
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.message} onClose={() => setToast(null)} duration={5000} />}
    </div>
  );
};

export default Timers;
