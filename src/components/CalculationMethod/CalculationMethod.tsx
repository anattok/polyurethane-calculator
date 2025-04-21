import React from 'react';
import { CalcMethodType } from '../../utils/types';
import { Input } from '../ui/Input/Input';

import s from './CalculationMethod.module.css';

interface CalculationMethodProps {
  calcMethodType: CalcMethodType;
  targetWeight: number;
  targetVolume: number;
  materialDensity: number;
  lossPercentage: number;
  setTargetWeight: (value: number) => void;
  setTargetVolume: (value: number) => void;
  setMaterialDensity: (value: number) => void;
  setLossPercentage: (value: number) => void;
}

export const CalculationMethod: React.FC<CalculationMethodProps> = ({
  calcMethodType,
  targetWeight,
  targetVolume,
  materialDensity,
  lossPercentage,
  setTargetWeight,
  setTargetVolume,
  setMaterialDensity,
  setLossPercentage,
}) => {
  //инпут Вес отливки
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetWeight(value === '' ? NaN : parseFloat(value));
  };
  //инпут Потери материала
  const handleLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLossPercentage(value === '' ? NaN : parseFloat(value));
  };
  //инпут Объём модели
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetVolume(value === '' ? NaN : parseFloat(value));
  };
  //инпут Плотность материала
  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaterialDensity(value === '' ? NaN : parseFloat(value));
  };
  return (
    <div className={s.inputsBox}>
      {calcMethodType === 'weight' ? (
        <>
          <Input
            label="Вес отливки (г):"
            sizeInput="small"
            value={isNaN(targetWeight) ? '' : targetWeight}
            onChange={handleWeightChange}
            className="input"
          />
          <Input
            label="Потери материала (%):"
            sizeInput="small"
            type="number"
            value={isNaN(lossPercentage) ? '' : lossPercentage}
            onChange={handleLossChange}
            min="0"
            max="100"
            className="input"
          />
        </>
      ) : (
        <>
          <Input
            label="Объём модели (см³):"
            sizeInput="small"
            type="number"
            value={isNaN(targetVolume) ? '' : targetVolume}
            onChange={handleVolumeChange}
            min="0"
            step="1"
            className="input"
          />
          <Input
            label="Плотность материала (г/см³):"
            sizeInput="small"
            type="number"
            value={isNaN(materialDensity) ? '' : materialDensity}
            onChange={handleDensityChange}
            min="0.1"
            step="0.01"
            className="input"
          />
        </>
      )}
    </div>
  );
};
