import { useMaterialCalculator } from '../../hooks/useMaterialCalculator';
import TypeSelector from '../../components/TypeSelector/TypeSelector';
import RatioSelector from '../../components/RatioSelector/RatioSelector';
import DyeSlider from '../../components/DyeSlider/DyeSlider';
import ResultsDisplay from '../../components/ResultsDisplay/ResultsDisplay';

import { CalculationMethod } from '../../components/CalculationMethod/CalculationMethod';

import s from './CalculatorPage.module.css';

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
    predefinedRatios
  } = useMaterialCalculator();

  return (
    <div className={s.app}>
      <div className={s.inputSection}>
        <h2>Параметры отливки:</h2>
        <TypeSelector calcMethodType={calcMethodType} setCalcMethodType={setCalcMethodType} />
        <CalculationMethod
          targetWeight={targetWeight}
          targetVolume={targetVolume}
          materialDensity={materialDensity}
          lossPercentage={lossPercentage}
          setTargetWeight={setTargetWeight}
          setTargetVolume={setTargetVolume}
          setMaterialDensity={setMaterialDensity}
          setLossPercentage={setLossPercentage}
          calcMethodType={calcMethodType}
        />
      </div>
      <RatioSelector
        ratio={ratio}
        aValue={aValue}
        bValue={bValue}
        handleRatioChange={handleRatioChange}
        setAValue={setAValue}
        setBValue={setBValue}
        predefinedRatios={predefinedRatios}
      />
      <DyeSlider dyeAmount={dyeAmount} setDyeAmount={setDyeAmount} />
      <ResultsDisplay results={results} calcMethodType={calcMethodType} />
    </div>
  );
};

export default CalculatorPage;
