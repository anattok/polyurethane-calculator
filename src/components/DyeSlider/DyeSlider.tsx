import React from 'react';
import styles from './DyeSlider.module.css';

interface DyeSliderProps {
  dyeAmount: number;
  setDyeAmount: (value: number) => void;
}

const DyeSlider: React.FC<DyeSliderProps> = ({ dyeAmount, setDyeAmount }) => {
  const handleDyeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDyeAmount(parseFloat(e.target.value));
  };

  return (
    <div className={styles.dyeSlider}>
      <h2>Количество красителя: {dyeAmount} г</h2>
      <input
        type="range"
        min="0"
        max="6"
        step="0.1"
        value={dyeAmount}
        onChange={handleDyeChange}
      />
      <div className={styles.sliderLabels}>
        <span>0 г</span>
        <span>6 г</span>
      </div>
    </div>
  );
};

export default DyeSlider;