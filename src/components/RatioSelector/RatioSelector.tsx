import React from 'react';
import styles from './RatioSelector.module.css';
import { useMaterialCalculator } from '../../hooks/useMaterialCalculator';

const RatioSelector = () => {
  const {
    ratio,
    aValue,
    bValue,
    predefinedRatios,
    handleRatioChange,
    setAValue,
    setBValue
  } = useMaterialCalculator();

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
          <button
            key={ratioOption.value}
            className={ratio === ratioOption.value ? styles.active : ''}
            onClick={() => handleRatioChange(ratioOption)}
          >
            {ratioOption.label}
          </button>
        ))}
      </div>
      <div className={styles.customRatio}>
        <div className={styles.inputGroup}>
          <label>
            Компонент A:
            <input 
              type="number" 
              value={aValue} 
              onChange={handleAChange} 
              min="0" 
              step="0.1"
            />
          </label>
          <span>:</span>
          <label>
            Компонент B:
            <input 
              type="number" 
              value={bValue} 
              onChange={handleBChange} 
              min="0" 
              step="0.1"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default RatioSelector;