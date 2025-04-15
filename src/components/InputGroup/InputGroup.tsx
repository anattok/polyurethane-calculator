import React from 'react';
import { InputType } from '../../utils/types'
import styles from './InputGroup.module.css';

interface InputGroupProps {
  inputType: InputType;
  targetWeight: number;
  targetVolume: number;
  materialDensity: number;
  lossPercentage: number;
  setTargetWeight: (value: number) => void;
  setTargetVolume: (value: number) => void;
  setMaterialDensity: (value: number) => void;
  setLossPercentage: (value: number) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  inputType,
  targetWeight,
  targetVolume,
  materialDensity,
  lossPercentage,
  setTargetWeight,
  setTargetVolume,
  setMaterialDensity,
  setLossPercentage
}) => {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetWeight(value === '' ? NaN : parseFloat(value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetVolume(value === '' ? NaN : parseFloat(value));
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaterialDensity(value === '' ? NaN : parseFloat(value));
  };

  const handleLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLossPercentage(value === '' ? NaN : parseFloat(value));
  };

  return (
    <div className={styles.inputGroup}>
      {inputType === 'weight' ? (
        <>
          <label>
            Вес отливки (г):
            <input
              type="number"
              value={isNaN(targetWeight) ? '' : targetWeight}
              onChange={handleWeightChange}
            />
          </label>
          <label>
            Потери материала (%):
            <input
              type="number"
              value={isNaN(lossPercentage) ? '' : lossPercentage}
              onChange={handleLossChange}
              min="0"
              max="100"
              step="1"
            />
          </label>
        </>
      ) : (
        <>
          <label>
            Объём модели (см³):
            <input
              type="number"
              value={isNaN(targetVolume) ? '' : targetVolume}
              onChange={handleVolumeChange}
              min="0"
              step="1"
            />
          </label>
          <label>
            Плотность материала (г/см³):
            <input
              type="number"
              value={isNaN(materialDensity) ? '' : materialDensity}
              onChange={handleDensityChange}
              min="0.1"
              step="0.01"
            />
          </label>
        </>
      )}
    </div>
  );
};

export default InputGroup;