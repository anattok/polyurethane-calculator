import { useState } from 'react';
import { RatioOption, InputType } from '../utils/types';
import { calculateComponents } from '../utils/calculations';
import { predefinedRatios } from '../utils/types';

export const useMaterialCalculator = () => {
  const [ratio, setRatio] = useState<string>('A100:B80');
  const [aValue, setAValue] = useState<number>(100);
  const [bValue, setBValue] = useState<number>(80);
  const [dyeAmount, setDyeAmount] = useState<number>(0);
  const [inputType, setInputType] = useState<InputType>('weight');
  const [targetWeight, setTargetWeight] = useState<number>(100);
  const [targetVolume, setTargetVolume] = useState<number>(100);
  const [materialDensity, setMaterialDensity] = useState<number>(1.05);
  const [lossPercentage, setLossPercentage] = useState<number>(20);

  const handleRatioChange = (selectedRatio: RatioOption) => {
    setRatio(selectedRatio.value);
    const foundRatio = predefinedRatios.find(r => r.value === selectedRatio.value);
    if (foundRatio) {
      setAValue(foundRatio.a);
      setBValue(foundRatio.b);
    }
  };

  const results = calculateComponents(
    aValue,
    bValue,
    dyeAmount,
    inputType,
    targetWeight,
    targetVolume,
    materialDensity,
    lossPercentage
  );

  return {
    ratio,
    aValue,
    bValue,
    dyeAmount,
    inputType,
    targetWeight,
    targetVolume,
    materialDensity,
    lossPercentage,
    results,
    setRatio,
    setAValue,
    setBValue,
    setDyeAmount,
    setInputType,
    setTargetWeight,
    setTargetVolume,
    setMaterialDensity,
    setLossPercentage,
    handleRatioChange,
    predefinedRatios
  };
};