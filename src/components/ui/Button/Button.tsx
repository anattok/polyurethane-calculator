import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import s from './Button.module.css';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
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