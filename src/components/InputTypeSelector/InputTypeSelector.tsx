import React from 'react';
import { InputType } from '../../../utils/types';
import styles from './InputTypeSelector.module.css';

interface InputTypeSelectorProps {
  inputType: InputType;
  setInputType: (type: InputType) => void;
}

const InputTypeSelector: React.FC<InputTypeSelectorProps> = ({ 
  inputType, 
  setInputType 
}) => {
  return (
    <div className={styles.inputTypeSelector}>
      <button
        className={inputType === 'weight' ? styles.active : ''}
        onClick={() => setInputType('weight')}
      >
        По весу
      </button>
      <button
        className={inputType === 'volume' ? styles.active : ''}
        onClick={() => setInputType('volume')}
      >
        По объёму
      </button>
    </div>
  );
};

export default InputTypeSelector;