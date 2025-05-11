import { FC, InputHTMLAttributes } from 'react';
import s from './Input.module.css';

type SizeInput = 'small' | 'medium' | 'large';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sizeInput?: SizeInput;
  className? :string;
}

export const Input: FC<InputProps> = ({ label, sizeInput, className, ...props }) => {
  const inputClasses = `${className} ${s.input} ${s[`${sizeInput}`]}`;

  return (
    <div className={inputClasses}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input {...props} />
    </div>
  );
};
