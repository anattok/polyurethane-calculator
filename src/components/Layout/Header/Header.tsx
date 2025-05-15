import s from './Header.module.css';
import { Button } from '../../ui/Button/Button';
import { LiveClock } from '../../LiveClock/LiveClock';

export type TabType = 'calculator' | 'timers';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
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
        </Button>
      </div>

      <LiveClock />
    </div>
  );
};

export default Header;
