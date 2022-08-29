const types = {
  danger: { bg: 'bg-[#f17573]', text: 'text-white' },
  warning: { bg: 'bg-[#f8d053]', text: 'text-white' },
  success: { bg: 'bg-[#10cfbd]', text: 'text-white' },
  info: { bg: 'bg-[#48b0f7]', text: 'text-white' }
};

interface IProps {
  children: any;
  type: 'danger' | 'warning' | 'success' | 'info';
  className?: string;
}

export const Alert: React.FC<IProps> = ({ children, className, type }) => {
  const { bg, text } = types[type];

  if (!children) return null;

  return <div className={`my-2 w-full rounded-md px-4 py-2 ${bg} ${text} ${className}`}>{children}</div>;
};
