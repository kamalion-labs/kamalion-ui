import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export type ButtonType = 'primary' | 'secondary' | 'danger' | 'warn' | 'info' | 'success';
export type ButtonSize = 'small' | 'normal' | 'large';

interface IProps {
  children: any;
  onClick?: () => Promise<void>;
  type?: ButtonType;
  size?: ButtonSize;
  icon?: any;
  usesLoader?: boolean;
  loadingText?: string;
  className?: string;
  submit?: boolean;
}

export const Button: React.FC<IProps> = ({
  children,
  onClick,
  icon,
  className = '',
  type = 'primary',
  usesLoader = false,
  loadingText = 'Loading...',
  submit = false
}) => {
  const [isLoading, setLoading] = useState(false);

  const handleOnClick = async () => {
    if (usesLoader) setLoading(true);

    await onClick!();

    if (usesLoader) setLoading(false);
  };

  return (
    <button onClick={handleOnClick} className={`button button-${type} ${className}`} type={submit ? 'submit' : 'button'}>
      {icon && !isLoading && <div className="button-icon">{icon}</div>}

      {icon && isLoading && (
        <div className="button-icon">
          <FaSpinner className="icon-spin" />
        </div>
      )}

      <div className="px-5 py-1 items-center text-center w-full">
        {!icon && isLoading && (
          <>
            <FaSpinner className="icon-spin mr-2" />
            {loadingText}
          </>
        )}
        {!isLoading && children}
        {isLoading && icon && loadingText}
      </div>
    </button>
  );
};
