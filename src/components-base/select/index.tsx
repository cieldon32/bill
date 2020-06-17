import React from 'react';

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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
          {title}
        </label>
      )}
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
