import React from 'react';
import * as styles from './styles';

interface InputProps {
  name?: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
  title?: string;
  status?: 'warnning' | 'info' | 'success' | 'error';
  message?: string;
  className?: string;
  help?: string;
  onChange?: (v: any) => void;
}

export const Input = ({
  name,
  type,
  placeholder,
  title,
  status,
  message,
  className,
  help,
  onChange,
}: InputProps) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };
  return (
    <div className={className}>
      {title && (
        <label className={styles.label} htmlFor={name}>
          {title}
        </label>
      )}
      <input
        className={`${styles.input} ${status === 'error' ? 'border-red-500' : ''}`}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
      {message && <p className={styles.message}>{message}</p>}
      {help && <p className={styles.help}>{help}</p>}
    </div>
  );
};
