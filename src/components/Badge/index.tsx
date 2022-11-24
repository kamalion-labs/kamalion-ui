interface IProps {
  children: any;
  type: 'danger' | 'warn' | 'success' | 'info';
  className?: string;
}

export const Badge: React.FC<IProps> = ({ children, className, type }) => {
  const colors = {
    danger: 'badge-danger',
    warn: 'badge-warn',
    info: 'badge-info',
    success: 'badge-success'
  };

  const alertType = colors[type];

  if (!children) return null;

  return <div className={`badge ${alertType} ${className}`}>{children}</div>;
};
