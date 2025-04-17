import React from 'react';
import s from './Button.module.css';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  color = 'primary',
  className = '',
  children,
  ...props
}) => {
  const buttonClasses = `${s.button} ${s[`${size}`]} ${s[`${color}`]} ${className}`.trim();
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};