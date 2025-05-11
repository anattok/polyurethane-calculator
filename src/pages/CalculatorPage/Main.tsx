import { useMaterialCalculator } from '../../hooks/useMaterialCalculator';

import { CalculationTypeSwitcher } from '../../components/CalculationTypeSwitcher/CalculationTypeSwitcher';
import RatioSelector from '../../components/RatioSelector/RatioSelector';
import DyeSlider from '../../components/DyeSlider/DyeSlider';
import ResultsDisplay from '../../components/ResultsDisplay/ResultsDisplay';


import s from './Main.module.css';
import Header from '../../components/Header/Header';


const CalculatorPage = () => {
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
      <Header/>
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
      
      <DyeSlider dyeAmount={dyeAmount} setDyeAmount={setDyeAmount} />
      <ResultsDisplay results={results} calcMethodType={calcMethodType} />
    </div>
  );
};

export default CalculatorPage;
