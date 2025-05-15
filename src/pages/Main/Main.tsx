import { useMaterialCalculator } from '../../hooks/useMaterialCalculator';
import { useState, useEffect } from 'react';

import { CalculationTypeSwitcher } from '../../components/CalculationTypeSwitcher/CalculationTypeSwitcher';
import RatioSelector from '../../components/RatioSelector/RatioSelector';
import ResultsDisplay from '../../components/ResultsDisplay/ResultsDisplay';
import Timers from '../../components/Timers/Timers';

import s from './Main.module.css';
import Header, { TabType } from '../../components/Layout/Header/Header';

const ACTIVE_TAB_KEY = 'activeTab';
const TIMERS_STORAGE_KEY = 'savedTimers';

interface Timer {
  id: number;
  name: string;
  duration: number;
  timeLeft: number;
  isRunning: boolean;
}

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
    return (savedTab as TabType) || 'calculator';
  });

  const [timers, setTimers] = useState<Timer[]>(() => {
    const savedTimers = localStorage.getItem(TIMERS_STORAGE_KEY);
    return savedTimers ? JSON.parse(savedTimers) : [];
  });

  // Сохраняем таймеры при изменении
  useEffect(() => {
    localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timers));
  }, [timers]);

  // Обновляем таймеры каждую секунду независимо от активной вкладки
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.timeLeft > 0) {
            return { ...timer, timeLeft: timer.timeLeft - 1 };
          } else if (timer.isRunning && timer.timeLeft === 0) {
            return { ...timer, isRunning: false };
          }
          return timer;
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    localStorage.setItem(ACTIVE_TAB_KEY, tab);
  };

  const handleAddTimer = (name: string, duration: number) => {
    const newTimer: Timer = {
      id: Date.now(),
      name,
      duration: duration * 60,
      timeLeft: duration * 60,
      isRunning: false,
    };
    setTimers([...timers, newTimer]);
  };

  const handleToggleTimer = (id: number) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === id) {
          if (timer.timeLeft === 0) {
            return { ...timer, timeLeft: timer.duration, isRunning: true };
          }
          return { ...timer, isRunning: !timer.isRunning };
        }
        return timer;
      }),
    );
  };

  const handleResetTimer = (id: number) => {
    setTimers(
      timers.map((timer) => {
        if (timer.id === id) {
          return { ...timer, timeLeft: timer.duration, isRunning: false };
        }
        return timer;
      }),
    );
  };

  const handleDeleteTimer = (id: number) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  const {
    // Метод расчета: по весу ('weight') или по объему ('volume')
    calcMethodType,
    // Функция для изменения метода расчета
    setCalcMethodType,
    // Вес целевого материала (в граммах)
    targetWeight,
    // Функция для изменения веса целевого материала
    setTargetWeight,
    // Объем целевого материала (в см³)
    targetVolume,
    // Функция для изменения объема целевого материала
    setTargetVolume,
    // Плотность материала (в г/см³)
    materialDensity,
    // Функция для изменения плотности материала
    setMaterialDensity,
    // Процент потерь материала при работе (в %)
    lossPercentage,
    // Функция для изменения процента потерь
    setLossPercentage,
    // Результаты расчетов (компонент A, компонент B, общий вес и т.д.)
    results,
    // Текущее соотношение компонентов (строка формата 'A1:B1')
    ratio,
    // Текущее значение компонента A
    aValue,
    // Текущее значение компонента B
    bValue,
    // Изменение значения компонента A
    setAValue,
    // Изменение значение компонента B
    setBValue,
    // Функция для обработки изменения соотношения (при выборе пресета)
    handleRatioChange,
    // Количество красителя (в граммах)
    dyeAmount,
    // Функция для изменения количества красителя
    setDyeAmount,
    predefinedRatios,
  } = useMaterialCalculator();

  return (
    <div className={s.wrapper}>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === 'calculator' && (
        <>
          <div className={s.inputSection}>
            <CalculationTypeSwitcher
              calcMethodType={calcMethodType}
              setCalcMethodType={setCalcMethodType}
              targetWeight={targetWeight}
              targetVolume={targetVolume}
              materialDensity={materialDensity}
              lossPercentage={lossPercentage}
              setTargetWeight={setTargetWeight}
              setTargetVolume={setTargetVolume}
              setMaterialDensity={setMaterialDensity}
              setLossPercentage={setLossPercentage}
              dyeAmount={dyeAmount}
              setDyeAmount={setDyeAmount}
            />
            <RatioSelector
              ratio={ratio}
              aValue={aValue}
              bValue={bValue}
              handleRatioChange={handleRatioChange}
              setAValue={setAValue}
              setBValue={setBValue}
              predefinedRatios={predefinedRatios}
            />
          </div>
          <ResultsDisplay results={results} calcMethodType={calcMethodType} />
        </>
      )}
      {activeTab === 'timers' && (
        <Timers
          timers={timers}
          onAddTimer={handleAddTimer}
          onToggleTimer={handleToggleTimer}
          onResetTimer={handleResetTimer}
          onDeleteTimer={handleDeleteTimer}
        />
      )}
    </div>
  );
};

export default MainPage;
