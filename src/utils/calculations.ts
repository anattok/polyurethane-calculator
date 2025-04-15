import { CalculationResult, InputType } from './types';

export const calculateComponents = (
  aValue: number,
  bValue: number,
  dyeAmount: number,
  inputType: InputType,
  targetWeight: number,
  targetVolume: number,
  materialDensity: number,
  lossPercentage: number
): CalculationResult => {
  let totalWeight = 0;
  
  if (inputType === 'weight') {
    const lossFactor = 1 + (lossPercentage / 100);
    totalWeight = targetWeight * lossFactor;
  } else {
    totalWeight = targetVolume * materialDensity;
  }

  const mixWeight = totalWeight - dyeAmount;
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