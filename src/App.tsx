import React, { useState } from 'react';
import './App.css';


// Тип для предопределенных соотношений
interface RatioOption {
  label: string;
  value: string;
  a: number;
  b: number;
}


function App() {
  const [ratio, setRatio] = useState<string>('A100:B80');
  const [aValue, setAValue] = useState<number>(100);
  const [bValue, setBValue] = useState<number>(80);
  const [dyeAmount, setDyeAmount] = useState<number>(0);
  const [inputType, setInputType] = useState<'weight' | 'volume'>('weight');
  const [targetWeight, setTargetWeight] = useState<number>(100);
  const [targetVolume, setTargetVolume] = useState<number>(100);
  const [materialDensity, setMaterialDensity] = useState<number>(1.05);
  const [lossPercentage, setLossPercentage] = useState<number>(20);//процент потерь по умолчанию

  const predefinedRatios: RatioOption[] = [
    { label: 'A1:B1', value: 'A1:B1', a: 1, b: 1 },
    { label: 'A60:B40', value: 'A60:B40', a: 60, b: 40 },
    { label: 'A100:B55', value: 'A100:B55', a: 100, b: 55 },
    { label: 'A2:B1', value: 'A2:B1', a: 2, b: 1 },
    { label: 'A100:B80', value: 'A100:B80', a: 100, b: 80 },
  ];

  const calculateComponents = () => {
    let totalWeight = 0;
    
    if (inputType === 'weight') {
      // Учитываем потери только при расчёте по весу
      const lossFactor = 1 + (lossPercentage / 100);
      totalWeight = targetWeight * lossFactor;
    } else {
      // Для объёма потери не учитываем
      totalWeight = targetVolume * materialDensity;
    }

    // Вычитаем вес красителя
    const mixWeight = totalWeight - dyeAmount;
    
    // Рассчитываем компоненты A и B
    const ratioTotal = aValue + bValue;
    const aComponent = (mixWeight * aValue) / ratioTotal;
    const bComponent = (mixWeight * bValue) / ratioTotal;

    return {
      a: aComponent,
      b: bComponent,
      total: aComponent + bComponent + dyeAmount,
      originalTarget: inputType === 'weight' ? targetWeight : targetVolume,
      inputType,
      withLoss: inputType === 'weight',
      lossPercentage: inputType === 'weight' ? lossPercentage : 0,
      totalWithoutLoss: inputType === 'weight' ? targetWeight : targetVolume * materialDensity
    };
  };

  const handleRatioChange = (selectedRatio: RatioOption) => {
    setRatio(selectedRatio.value);
    const foundRatio = predefinedRatios.find(r => r.value === selectedRatio.value);
    if (foundRatio) {
      setAValue(foundRatio.a);
      setBValue(foundRatio.b);
    }
  };

  const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAValue(value);
    setRatio('custom');
  };

  const handleBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBValue(value);
    setRatio('custom');
  };

  const handleDyeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDyeAmount(parseFloat(e.target.value));
  };

  const handleInputTypeChange = (type: 'weight' | 'volume') => {
    setInputType(type);
  };

  const handleTargetWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetWeight(parseFloat(e.target.value) || 0);
  };

  const handleTargetVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetVolume(parseFloat(e.target.value) || 0);
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterialDensity(parseFloat(e.target.value) || 1);
  };

  const handleLossChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLossPercentage(parseFloat(e.target.value) || 0);
  };

  const results = calculateComponents();

  return (
    <div className="app">
      <div className="input-section">
        <h2>Параметры отливки:</h2>
        <div className="input-type-selector">
          <button
            className={inputType === 'weight' ? 'active' : ''}
            onClick={() => handleInputTypeChange('weight')}
          >
            По весу
          </button>
          <button
            className={inputType === 'volume' ? 'active' : ''}
            onClick={() => handleInputTypeChange('volume')}
          >
            По объёму
          </button>
        </div>

        {inputType === 'weight' ? (
          <div className="input-group">
            <label>
              Вес отливки (г):
              <input
                type="number"
                value={targetWeight}
                onChange={handleTargetWeightChange}
                min="0"
                step="1"
              />
            </label>
            <label>
              Потери материала (%):
              <input
                type="number"
                value={lossPercentage}
                onChange={handleLossChange}
                min="0"
                max="100"
                step="1"
              />
            </label>
          </div>
        ) : (
          <div className="input-group">
            <label>
              Объём модели (см³):
              <input
                type="number"
                value={targetVolume}
                onChange={handleTargetVolumeChange}
                min="0"
                step="1"
              />
            </label>
            <label>
              Плотность материала (г/см³):
              <input
                type="number"
                value={materialDensity}
                onChange={handleDensityChange}
                min="0.1"
                step="0.01"
              />
            </label>
          </div>
        )}
      </div>

      {/* Остальная часть интерфейса остаётся без изменений */}
      <div className="ratio-selector">
        <h2>Соотношение компонентов:</h2>
        <div className="ratio-buttons">
          {predefinedRatios.map((ratioOption) => (
            <button
              key={ratioOption.value}
              className={ratio === ratioOption.value ? 'active' : ''}
              onClick={() => handleRatioChange(ratioOption)}
            >
              {ratioOption.label}
            </button>
          ))}
        </div>
        <div className="custom-ratio">
          <div className="input-group">
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

      <div className="dye-slider">
        <h2>Количество красителя: {dyeAmount} г</h2>
        <input
          type="range"
          min="0"
          max="6"
          step="0.1"
          value={dyeAmount}
          onChange={handleDyeChange}
        />
        <div className="slider-labels">
          <span>0 г</span>
          <span>6 г</span>
        </div>
      </div>

      <div className="results">
        <h2>Результаты:</h2>
        <p>Соотношение: {ratio === 'custom' ? `A${aValue}:B${bValue}` : ratio}</p>
        <p>Компонент A: {results.a.toFixed(1)} г</p>
        <p>Компонент B: {results.b.toFixed(1)} г</p>
        <p>Краситель: {dyeAmount} г</p>
        <p>Общий вес смеси: {results.total.toFixed(1)} г</p>
        
        {inputType === 'weight' && (
          <>
            <p>Вес отливки: {targetWeight} г</p>
            <p>Учтённые потери: {lossPercentage}% (+{results.totalWithoutLoss * (lossPercentage/100)} г)</p>
          </>
        )}
        
        {inputType === 'volume' && (
          <p>Расчётный вес для {targetVolume} см³ при плотности {materialDensity} г/см³</p>
        )}
      </div>
    </div>
  );
}

export default App;