import { CalculationResult, CalcMethodType } from './types';

// export const calculateComponents = (
//   aValue: number,
//   bValue: number,
//   dyeAmount: number,
//   calcMethodType: CalcMethodType,
//   targetWeight: number,
//   targetVolume: number,
//   materialDensity: number,
//   lossPercentage: number
// ): CalculationResult => {
//   let totalWeight = 0;
  
//   if (calcMethodType === 'weight') {
//     const lossFactor = 1 + (lossPercentage / 100);
//     totalWeight = targetWeight * lossFactor;
//   } else {
//     totalWeight = targetVolume * materialDensity;
//   }

//   const mixWeight = totalWeight - dyeAmount;
//   const ratioTotal = aValue + bValue;
//   const aComponent = (mixWeight * aValue) / ratioTotal;
//   const bComponent = (mixWeight * bValue) / ratioTotal;

//   return {
//     a: aComponent,
//     b: bComponent,
//     total: aComponent + bComponent + dyeAmount,
//     originalTarget: calcMethodType === 'weight' ? targetWeight : targetVolume,
//     calcMethodType,
//     withLoss: calcMethodType === 'weight',
//     lossPercentage: calcMethodType === 'weight' ? lossPercentage : 0,
//     totalWithoutLoss: calcMethodType === 'weight' ? targetWeight : targetVolume * materialDensity
//   };
// };

export const calculateComponents = (
  aValue: number,
  bValue: number,
  dyeAmount: number, // Краситель — всегда добавка
  calcMethodType: CalcMethodType,
  targetWeight: number,
  targetVolume: number,
  materialDensity: number,
  lossPercentage: number
): CalculationResult => {
  // 1. Расчёт базового веса (с потерями, если нужно)
  let baseWeight = calcMethodType === 'weight' 
    ? targetWeight * (1 + lossPercentage / 100) 
    : targetVolume * materialDensity;

  // 2. Общий вес = базовый вес + краситель
  const totalWeight = baseWeight + dyeAmount;

  // 3. Распределяем ОСНОВНУЮ смесь (без красителя) по пропорции A/B
  const ratioTotal = aValue + bValue;
  const aComponent = (baseWeight * aValue) / ratioTotal;
  const bComponent = (baseWeight * bValue) / ratioTotal;

  return {
    a: aComponent,
    b: bComponent,
    dye: dyeAmount, // Краситель как отдельное поле
    total: totalWeight, // baseWeight + dyeAmount
    originalTarget: calcMethodType === 'weight' ? targetWeight : targetVolume,
    calcMethodType,
    withLoss: calcMethodType === 'weight',
    lossPercentage: calcMethodType === 'weight' ? lossPercentage : 0,
    totalWithoutLoss: calcMethodType === 'weight' 
      ? targetWeight + dyeAmount // Для режима "по весу"
      : targetVolume * materialDensity + dyeAmount // Для режима "по объёму"
  };
};