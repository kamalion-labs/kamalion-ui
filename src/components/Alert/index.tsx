interface IProps {
  children: any;
  type: 'danger' | 'warning' | 'success' | 'info';
  className?: string;
}

export const Alert: React.FC<IProps> = ({ children, className, type }) => {
  const colors = {
    danger: 'alert-danger',
    warning: 'alert-warn',
    info: 'alert-info',
    success: 'alert-success'
  };

  const alertType = colors[type];

  if (!children) return null;

  return <div className={`alert ${alertType} ${className}`}>{children}</div>;
};
