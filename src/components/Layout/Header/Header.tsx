import s from './Header.module.css';
import { Button } from '../../ui/Button/Button';
import { LiveClock } from '../../LiveClock/LiveClock';
import { useTimers } from '../../../context/TimerContext';

export type TabType = 'calculator' | 'timers';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const { timers } = useTimers();

  const runningTimers = timers.filter((timer) => timer.isRunning && timer.timeLeft > 0).length;
  const completedTimers = timers.filter((timer) => timer.timeLeft === 0).length;

  return (
    <div className={s.header}>
      <div className={s.buttonWrapper}>
        <Button
          className={activeTab === 'calculator' ? s.active : ''}
          color="primary"
          size="medium"
          onClick={() => onTabChange('calculator')}
        >
          Калькулятор
        </Button>
        <Button
          className={activeTab === 'timers' ? s.active : ''}
          color="primary"
          size="medium"
          onClick={() => onTabChange('timers')}
        >
          Таймеры
          {(runningTimers > 0 || completedTimers > 0) && (
            <span className={s.timerBadges}>
              {runningTimers > 0 && (
                <span className={s.activeBadge} title="Запущенные таймеры">
                  {runningTimers}
                </span>
              )}
              {completedTimers > 0 && (
                <span className={s.completedBadge} title="Завершённые таймеры">
                  {completedTimers}
                </span>
              )}
            </span>
          )}
        </Button>
      </div>

      <LiveClock />
    </div>
  );
};

export default Header;
