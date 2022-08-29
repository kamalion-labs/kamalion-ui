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

export const Badge: React.FC<IProps> = ({ children, className, type }) => {
  const { bg, text } = types[type];

  if (!children) return null;

  return <div className={`my-2 rounded-full w-fit px-4 py-1 text-[10pt] font-semibold ${bg} ${text} ${className}`}>{children}</div>;
};
