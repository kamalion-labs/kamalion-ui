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
  className,
  type = 'primary',
  usesLoader = false,
  loadingText = 'Loading...',
  submit = false
}) => {
  const [isLoading, setLoading] = useState(false);

  const colors = {
    primary: { background: 'bg-[#6D6EF0]', text: 'text-white', border: '' },
    secondary: { background: 'bg-white', text: 'text-sky-500', border: 'border-sky-500' },
    danger: { background: 'bg-[#f17573]', text: 'text-white', border: '' },
    warn: { background: 'bg-[#f8d053]', text: 'text-white', border: '' },
    info: { background: 'bg-[#48b0f7]', text: 'text-white', border: '' },
    success: { background: 'bg-[#10cfbd]', text: 'text-white', border: '' }
  };

  const { background, border, text } = colors[type];

  const handleOnClick = async () => {
    if (usesLoader) setLoading(true);

    await onClick!();

    if (usesLoader) setLoading(false);
  };

  return (
    <button
      onClick={handleOnClick}
      className={`flex h-[32px] flex-row rounded-md ${background} ${text} border-1 ${border} my-1 text-sm font-semibold transition hover:opacity-75 ${className}`}
      type={submit ? 'submit' : 'button'}
    >
      {icon && !isLoading && <div className="button-icon">{icon}</div>}

      {icon && isLoading && (
        <div className="button-icon">
          <FaSpinner className="icon-spin" />
        </div>
      )}

      <div className="px-5 py-1 flex items-center">
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
