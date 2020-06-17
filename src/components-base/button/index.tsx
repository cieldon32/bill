import React from 'react';
import * as styles from './styles';

interface ButtonProps {
  type?: 'normal' | 'primary' | 'warnning' | 'info' | 'success' | 'error';
  shape?: 'button' | 'link' | 'text';
  children: unknown;
  onClick?: () => any;
  href?: string;
  className?: string;
}

export const Button = ({
  shape = 'button',
  type = 'normal',
  children,
  onClick,
  href,
  className,
}: ButtonProps) => {
  switch (shape) {
    case 'link': {
      return (
        <a className={className} href={href}>
          {children}
        </a>
      );
    }

    case 'text': {
      return (
        <div className={className} onClick={onClick}>
          {children}
        </div>
      );
    }

    default: {
      return (
        <button className={`${className}`} onClick={onClick} type="button">
          {children}
        </button>
      );
    }
  }
};
