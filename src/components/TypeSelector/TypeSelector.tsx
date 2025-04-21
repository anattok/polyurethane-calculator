import React from 'react';
import { CalcMethodType } from '../../utils/types';
import { Button } from '../ui/Button/Button';
import s from './TypeSelector.module.css';
interface InputTypeSelectorProps {
  calcMethodType: CalcMethodType;
  setCalcMethodType: (type: CalcMethodType) => void;
}

const InputTypeSelector: React.FC<InputTypeSelectorProps> = ({
  calcMethodType,
  setCalcMethodType,
}) => {

  return (
    <div className={s.inputTypeSelector}>
      <Button
        className={calcMethodType === 'weight' ? s.active : ''}
        color="primary"
        size="large"
        onClick={() => setCalcMethodType('weight')}
      >
        По весу
      </Button>
      <Button
        className={calcMethodType === 'volume' ? s.active : ''}
        color="primary"
        size="large"
        onClick={() => setCalcMethodType('volume')}
      >
        По объёму
      </Button>
    </div>
  );
};

export default InputTypeSelector;
