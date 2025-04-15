export interface RatioOption {
    label: string;
    value: string;
    a: number;
    b: number;
  }
  
  export type InputType = 'weight' | 'volume';
  
  export interface CalculationResult {
    a: number;
    b: number;
    total: number;
    originalTarget: number;
    inputType: InputType;
    withLoss: boolean;
    lossPercentage: number;
    totalWithoutLoss: number;
  }
  
  export const predefinedRatios: RatioOption[] = [
    { label: 'A1:B1', value: 'A1:B1', a: 1, b: 1 },
    { label: 'A60:B40', value: 'A60:B40', a: 60, b: 40 },
    { label: 'A100:B55', value: 'A100:B55', a: 100, b: 55 },
    { label: 'A2:B1', value: 'A2:B1', a: 2, b: 1 },
    { label: 'A100:B80', value: 'A100:B80', a: 100, b: 80 },
  ];