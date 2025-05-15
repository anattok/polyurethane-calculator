import MainPage from './pages/Main/Main';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import { TimerProvider } from './context/TimerContext';
import { NotificationHandler } from './components/NotificationHandler/NotificationHandler';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimerProvider>
      <NotificationHandler />
      <div className="app-container">
        <MainPage />
      </div>
    </TimerProvider>
  </StrictMode>,
);
