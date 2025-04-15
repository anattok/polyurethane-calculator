import React from 'react';
import { CalculationResult, InputType } from '../../utils/types';
import styles from './ResultsDisplay.module.css';

interface ResultsDisplayProps {
  results: CalculationResult;
  inputType: InputType;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, inputType }) => {
  return (
    <div className={styles.results}>
      <h2>Результаты:</h2>
      <div className={styles.resultItem}>
        <span>Компонент A:</span>
        <span>{results.a.toFixed(1)} г</span>
      </div>
      <div className={styles.resultItem}>
        <span>Компонент B:</span>
        <span>{results.b.toFixed(1)} г</span>
      </div>
      <div className={styles.resultItem}>
        <span>Общий вес смеси:</span>
        <span>{results.total.toFixed(1)} г</span>
      </div>

      {inputType === 'weight' && (
        <>
          <div className={styles.resultItem}>
            <span>Вес отливки:</span>
            <span>{results.originalTarget} г</span>
          </div>
          <div className={styles.resultItem}>
            <span>Учтённые потери:</span>
            <span>
              {results.lossPercentage}% (+
              {(results.totalWithoutLoss * (results.lossPercentage/100)).toFixed(1)} г)
            </span>
          </div>
        </>
      )}
      
      {inputType === 'volume' && (
        <div className={styles.resultItem}>
          <span>Расчётный вес для:</span>
          <span>
            {results.originalTarget} см³ при плотности {results.totalWithoutLoss / results.originalTarget} г/см³
          </span>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;