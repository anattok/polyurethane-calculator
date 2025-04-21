import { useState } from 'react';
import { RatioOption, CalcMethodType } from '../utils/types';
import { calculateComponents } from '../utils/calculations';
import { predefinedRatios } from '../utils/types';

export const useMaterialCalculator = () => {
  //тип рассчета по весу или по объему
  const [calcMethodType, setCalcMethodType] = useState<CalcMethodType>('weight');

  const [targetWeight, setTargetWeight] = useState<number>(100);
  const [targetVolume, setTargetVolume] = useState<number>(100);
  const [materialDensity, setMaterialDensity] = useState<number>(1.05);
  const [lossPercentage, setLossPercentage] = useState<number>(20);

  const [ratio, setRatio] = useState<string>('A1:B1');
  const [aValue, setAValue] = useState<number>(100);
  const [bValue, setBValue] = useState<number>(100);

  const [dyeAmount, setDyeAmount] = useState<number>(0);
  

  const results = calculateComponents(
    aValue,
    bValue,
    dyeAmount,
    calcMethodType,
    targetWeight,
    targetVolume,
    materialDensity,
    lossPercentage
  );

  const handleRatioChange = (selectedRatio: RatioOption) => {
    setRatio(selectedRatio.value);
    const foundRatio = predefinedRatios.find(r => r.value === selectedRatio.value);
    if (foundRatio) {
      
      setAValue(foundRatio.a);
      setBValue(foundRatio.b);
      
    }
  };



  return {
    ratio,
    aValue,
    bValue,
    dyeAmount,
    setCalcMethodType,
    calcMethodType,
    targetWeight,
    targetVolume,
    materialDensity,
    lossPercentage,
    results,
    setRatio,
    setAValue,
    setBValue,
    setDyeAmount,
    setTargetWeight,
    setTargetVolume,
    setMaterialDensity,
    setLossPercentage,
    handleRatioChange,
    predefinedRatios
  };
};