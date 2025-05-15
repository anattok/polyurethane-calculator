import { useEffect, useState } from 'react';
import s from './Toast.module.css';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return <div className={`${s.toast} ${isClosing ? s.toastHide : ''}`}>{message}</div>;
};
