import React from 'react';
import s from './Header.module.css';
import { Button } from '../ui/Button/Button';

const Header = () => {
  return (
    <div className={s.header}>
      <Button className={s.active} color="primary" size="medium" onClick={() => console.log('Калькулятор')}>
        Калькулятор
      </Button>
      <Button className={s.active} color="primary" size="medium" onClick={() => console.log('Таймеры')}>
        Таймеры
      </Button>
    </div>
  );
};

export default Header;
