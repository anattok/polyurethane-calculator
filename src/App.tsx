import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="app-container">
      <CalculatorPage />
    </div>
  </StrictMode>,
);
