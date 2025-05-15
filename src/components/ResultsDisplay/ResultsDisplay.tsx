import React from 'react';
import { CalculationResult, CalcMethodType } from '../../utils/types';
import s from './ResultsDisplay.module.css';

interface ResultsDisplayProps {
  results: CalculationResult;
  calcMethodType: CalcMethodType;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, calcMethodType }) => {
  return (
    <div className={s.results}>
      <h2>Результаты расчета</h2>
      <div className={s.resultItem}>
        <span>Компонент A</span>
        <span>{results.a.toFixed(1)} г</span>
      </div>
      <div className={s.resultItem}>
        <span>Компонент B</span>
        <span>{results.b.toFixed(1)} г</span>
      </div>
      <div className={s.resultItem}>
        <span>Общий вес</span>
        <span>{results.total.toFixed(1)} г</span>
      </div>

      {calcMethodType === 'weight' && (
        <>
          <div className={s.resultItem}>
            <span>Вес отливки</span>
            <span>{results.originalTarget} г</span>
          </div>
          <div className={s.resultItem}>
            <span>Потери {results.lossPercentage}%</span>
            <span>+{(results.totalWithoutLoss * (results.lossPercentage / 100)).toFixed(1)} г</span>
          </div>
        </>
      )}

      {calcMethodType === 'volume' && (
        <div className={s.resultItem}>
          <span>Объем/Плотность</span>
          <span>
            {results.originalTarget} см³ /{' '}
            {(results.totalWithoutLoss / results.originalTarget).toFixed(2)} г/см³
          </span>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
