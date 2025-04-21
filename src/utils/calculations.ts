import { CalculationResult, CalcMethodType } from './types';

export const calculateComponents = (
  aValue: number,
  bValue: number,
  dyeAmount: number,
  calcMethodType: CalcMethodType,
  targetWeight: number,
  targetVolume: number,
  materialDensity: number,
  lossPercentage: number
): CalculationResult => {
  let totalWeight = 0;
  
  if (calcMethodType === 'weight') {
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
    originalTarget: calcMethodType === 'weight' ? targetWeight : targetVolume,
    calcMethodType,
    withLoss: calcMethodType === 'weight',
    lossPercentage: calcMethodType === 'weight' ? lossPercentage : 0,
    totalWithoutLoss: calcMethodType === 'weight' ? targetWeight : targetVolume * materialDensity
  };
};