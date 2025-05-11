import React from 'react';

import { CalcMethodType } from '../../utils/types';
import { Button } from '../ui/Button/Button';
import { Input } from '../ui/Input/Input';

import s from './CalculationTypeSwitcher.module.css';

interface CalculationTypeSwitcherProps {
  calcMethodType: CalcMethodType;
  targetWeight: number;
  targetVolume: number;
  materialDensity: number;
  lossPercentage: number;
  setCalcMethodType: (type: CalcMethodType) => void;
  setTargetWeight: (value: number) => void;
  setTargetVolume: (value: number) => void;
  setMaterialDensity: (value: number) => void;
  setLossPercentage: (value: number) => void;
}

export const CalculationTypeSwitcher: React.FC<CalculationTypeSwitcherProps> = ({
  calcMethodType,
  targetWeight,
  targetVolume,
  materialDensity,
  lossPercentage,
  setCalcMethodType,
  setTargetWeight,
  setTargetVolume,
  setMaterialDensity,
  setLossPercentage,
}) => {
  // Обработчики изменений полей ввода
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetWeight(value === '' ? NaN : parseFloat(value));
  };

  const handleLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLossPercentage(value === '' ? NaN : parseFloat(value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetVolume(value === '' ? NaN : parseFloat(value));
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaterialDensity(value === '' ? NaN : parseFloat(value));
  };

  return (
    <div className={s.calculationTypeSwitcher}>
      <h2>Параметры отливки:</h2>
      <div className={s.selectorButtons}>
        <Button
          className={calcMethodType === 'weight' ? s.active : ''}
          color="primary"
          size="large"
          onClick={() => setCalcMethodType('weight')}
        >
          По весу
        </Button>
        <Button
          className={calcMethodType === 'volume' ? s.active : ''}
          color="primary"
          size="large"
          onClick={() => setCalcMethodType('volume')}
        >
          По объёму
        </Button>
      </div>
      <div className={s.inputsBox}>
        {calcMethodType === 'weight' ? (
          <>
            <Input
              label="Вес отливки (г)"
              sizeInput="small"
              value={isNaN(targetWeight) ? '' : targetWeight}
              onChange={handleWeightChange}
              className="inputWrap"
            />
            <Input
              label="Потери материала (%)"
              sizeInput="small"
              type="number"
              value={isNaN(lossPercentage) ? '' : lossPercentage}
              onChange={handleLossChange}
              min="0"
              max="100"
              className="inputWrap"
            />
          </>
        ) : (
          <>
            <Input
              label="Объём модели (см³)"
              sizeInput="small"
              type="number"
              value={isNaN(targetVolume) ? '' : targetVolume}
              onChange={handleVolumeChange}
              min="0"
              step="1"
              className="inputWrap"
            />
            <Input
              label="Плотность материала (г/см³)"
              sizeInput="small"
              type="number"
              value={isNaN(materialDensity) ? '' : materialDensity}
              onChange={handleDensityChange}
              min="0.1"
              step="0.01"
              className="inputWrap"
            />
          </>
        )}
      </div>
    </div>
  );
};
