import React from 'react';
import * as styles from './styles';

export interface SelectOptions {
  value: number | string;
  label: string;
}

interface SelectProps {
  name?: string;
  placeholder?: string;
  title?: string;
  status?: 'warnning' | 'info' | 'success' | 'error';
  message?: string;
  className?: string;
  help?: string;
  dataSource: SelectOptions[];
  value?: string | number;
  onChange?: (v: string) => void;
}

export const Select = ({
  value,
  name,
  placeholder,
  title,
  status,
  message,
  help,
  dataSource,
  onChange,
  className,
}: SelectProps) => {
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
      <select
        className={styles.select}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleChange}
      >
        {dataSource.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {message && <p className="text-red-500 text-xs italic">{message}</p>}
      {help && <p className="text-gray-600 text-xs italic">{help}</p>}
    </div>
  );
};
