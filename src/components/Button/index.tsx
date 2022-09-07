import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export type ButtonType = 'primary' | 'secondary' | 'danger' | 'warn' | 'info' | 'success';
export type ButtonSize = 'small' | 'normal' | 'large';

interface IProps {
  children?: any;
  onClick?: (e?: any) => void | Promise<void>;
  type?: ButtonType;
  size?: ButtonSize;
  icon?: any;
  usesLoader?: boolean;
  loadingText?: string;
  className?: string;
  submit?: boolean;
}

export const Button = React.forwardRef<any, IProps>(
  ({ children, onClick, icon, className, type = 'primary', usesLoader = false, loadingText = 'Loading...', submit = false }, ref) => {
    const [isLoading, setLoading] = useState(false);

    const colors = {
      primary: 'button-primary',
      secondary: 'button-secondary',
      danger: 'button-danger',
      warn: 'button-warn',
      info: 'button-info',
      success: 'button-success'
    };

    const buttonType = colors[type];

    const handleOnClick = async (e: any) => {
      if (usesLoader) setLoading(true);

      if (onClick) await onClick(e);

      if (usesLoader) setLoading(false);
    };

    return (
      <button onClick={handleOnClick} className={`button ${buttonType} ${className}`} type={submit ? 'submit' : 'button'} ref={ref}>
        {icon && !isLoading && <div className="button-icon">{icon}</div>}

        {icon && isLoading && (
          <div className="button-icon">
            <FaSpinner className="icon-spin" />
          </div>
        )}

        {children && (
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
        )}
      </button>
    );
  }
);
