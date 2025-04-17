import React from 'react';
import { InputType } from '../../utils/types';
import { Button } from '../Button/Button';
import styles from './InputTypeSelector.module.css';

interface InputTypeSelectorProps {
  inputType: InputType;
  setInputType: (type: InputType) => void;
}

const InputTypeSelector: React.FC<InputTypeSelectorProps> = ({ inputType, setInputType }) => {
  return (
    <div className={styles.inputTypeSelector}>
      <Button
        color="primary"
        size="large"
        onClick={() => setInputType('weight')}
      >
        По весу
      </Button>
      <Button
        color="primary"
        size="large"
        onClick={() => setInputType('volume')}

      >
        По объёму
      </Button>
    </div>
  );
};

export default InputTypeSelector;
