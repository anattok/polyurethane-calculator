import React from 'react';
import styles from './RatioSelector.module.css';
import { Button } from '../ui/Button/Button';

interface RatioOption {
  value: string;
  label: string;
  a: number;
  b: number;
}

interface RatioSelectorProps {
  ratio: string;
  aValue: number;
  bValue: number;
  predefinedRatios: RatioOption[];
  handleRatioChange: (ratio: RatioOption) => void;
  setAValue: (value: number) => void;
  setBValue: (value: number) => void;
}

const RatioSelector: React.FC<RatioSelectorProps> = ({
  ratio,
  aValue,
  bValue,
  predefinedRatios,
  handleRatioChange,
  setAValue,
  setBValue,
}) => {
  //ввод своего значения а
  const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAValue(value);
  };

  //ввод своего значения б
  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBValue(value);
  };

  return (
    <div className={styles.ratioSelector}>
      <h2>Соотношение компонентов:</h2>
      <div className={styles.ratioButtons}>
        {predefinedRatios.map((ratioOption) => (
          <Button
            className={ratio === ratioOption.value ? styles.active : ''}
            key={ratioOption.value}
            color="primary"
            size="large" //TODO: НЕ РАБОТАЕТ РАЗМЕР
            onClick={() => handleRatioChange(ratioOption)}
          >
            {ratioOption.label}
          </Button>
        ))}
      </div>
      <div className={styles.customRatio}>
        <div className={styles.inputGroup}>
          <label>
            Компонент A:
            <input type="number" value={aValue} onChange={handleAChange} min="0" step="0.1" />
          </label>
          <span>:</span>
          <label>
            Компонент B:
            <input type="number" value={bValue} onChange={handleBChange} min="0" step="0.1" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default RatioSelector;
