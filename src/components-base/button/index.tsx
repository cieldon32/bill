import React from 'react';

interface ButtonProps {
  type?: 'normal' | 'primary' | 'warnning' | 'info' | 'success' | 'error';
  shape?: 'button' | 'link' | 'text';
  children: unknown;
  onClick?: () => any;
  href?: string;
  className?: string;
}

const normal =
  'shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded';
const primary = 'bg-blue-500 hover:bg-blue-70';
const warnning = 'bg-yellow-500 hover:bg-yellow-70';
// const info = "bg-gray-500 hover:bg-gray-70";
// const success = "bg-green-500 hover:bg-green-70";
// const error = "bg-red-500 hover:bg-red-70";

export const Button = ({
  shape = 'button',
  type = 'normal',
  children,
  onClick,
  href,
  className,
}: ButtonProps) => {
  const btnClassName = `${normal} ${type === 'primary' && primary} ${
    type === 'warnning' && warnning
  }`;
  switch (shape) {
    case 'link':
      return (
        <a className={className} href={href}>
          {children}
        </a>
      );
    case 'text':
      return (
        <div className={className} onClick={onClick}>
          {children}
        </div>
      );
    default:
      return (
        <button className={`${btnClassName} ${className}`} onClick={onClick}>
          {children}
        </button>
      );
  }
};
