import { useMaterialCalculator } from '../../hooks/useMaterialCalculator';
import InputTypeSelector from '../../components/InputTypeSelector/InputTypeSelector';
import RatioSelector from '../../components/RatioSelector/RatioSelector';
import DyeSlider from '../../components/DyeSlider/DyeSlider';
import ResultsDisplay from '../../components/ResultsDisplay/ResultsDisplay';
import InputGroup from '../../components/InputGroup/InputGroup';
import styles from './CalculatorPage.module.css';

const CalculatorPage = () => {
  const {
    inputType,
    targetWeight,
    targetVolume,
    materialDensity,
    lossPercentage,
    results,
    setInputType,
    setTargetWeight,
    setTargetVolume,
    setMaterialDensity,
    setLossPercentage
  } = useMaterialCalculator();

  return (
    <div className={styles.app}>
      <div className={styles.inputSection}>
        <h2>Параметры отливки:</h2>
        <InputTypeSelector 
          inputType={inputType} 
          setInputType={setInputType} 
        />
        
        <InputGroup
          inputType={inputType}
          targetWeight={targetWeight}
          targetVolume={targetVolume}
          materialDensity={materialDensity}
          lossPercentage={lossPercentage}
          setTargetWeight={setTargetWeight}
          setTargetVolume={setTargetVolume}
          setMaterialDensity={setMaterialDensity}
          setLossPercentage={setLossPercentage}
        />
      </div>

      <RatioSelector />
      <DyeSlider />
      <ResultsDisplay results={results} inputType={inputType} />
    </div>
  );
};

export default CalculatorPage;