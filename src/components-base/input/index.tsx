import React from 'react';

interface InputProps {
  name: string;
  type: 'text' | 'email';
  placeholder?: string;
  title?: string;
  status?: 'warnning' | 'info' | 'success' | 'error';
  message?: string;
  className?: string;
  help?: string;
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
}: InputProps) => {
  <div className={className}>
    {title && (
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {title}
      </label>
    )}
    <input
      className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal ${
        status === 'error' ? 'border-red-500' : ''
      }`}
      type={type}
      placeholder={placeholder}
      name={name}
    />
    {status === 'error' && message && <p className="text-red-500 text-xs italic">{message}</p>}
    {help && <p className="text-gray-600 text-xs italic">{help}</p>}
  </div>;
};
