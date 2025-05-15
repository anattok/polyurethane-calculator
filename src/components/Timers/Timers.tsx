import { useState } from 'react';
import s from './Timers.module.css';
import { Button } from '../ui/Button/Button';
import { useTimers } from '../../context/TimerContext';

const Timers = () => {
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerDuration, setNewTimerDuration] = useState('');
  const { timers, addTimer, toggleTimer, resetTimer, deleteTimer } = useTimers();

  const handleAddTimer = () => {
    if (!newTimerName || !newTimerDuration) return;

    const duration = parseInt(newTimerDuration);
    addTimer(newTimerName, duration);
    setNewTimerName('');
    setNewTimerDuration('');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={s.timersContainer}>
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
              <div className={s.timeWrapper}>
                <div className={timer.timeLeft === 0 ? s.timeCompleted : s.time}>
                  {formatTime(timer.timeLeft)}
                </div>
                {timer.timeLeft === 0 && timer.isRunning && (
                  <div className={s.overtime}>+{formatTime(timer.overtime)}</div>
                )}
              </div>
            </div>
            <div className={s.timerControls}>
              <Button onClick={() => toggleTimer(timer.id)} color="primary" size="small">
                {timer.isRunning ? 'Пауза' : timer.timeLeft === 0 ? 'Перезапуск' : 'Старт'}
              </Button>
              <Button onClick={() => resetTimer(timer.id)} color="secondary" size="small">
                Сброс
              </Button>
              <Button onClick={() => deleteTimer(timer.id)} color="danger" size="small">
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timers;
