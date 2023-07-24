import { Button as Btn } from 'primereact/button';

export type ButtonProps = {
  type?: 'button' | 'submit';
  label?: string;
  icon?: string;
  autoFocus?: boolean;
  rounded?: boolean;
  text?: boolean;
  severity?: 'info' | 'secondary' | 'success' | 'warning' | 'danger' | 'help';
  size?: 'small' | 'large';
  tooltip?: string;
  onClick?: () => void;
};

export const Button = ({
  onClick,
  label,
  icon,
  // autoFocus,
  size,
  tooltip,
  text,
  rounded = false,
  severity,
  type = 'button',
}: ButtonProps) => {
  return (
    <Btn
      size={size}
      type={type}
      onClick={onClick}
      label={label}
      icon={icon}
      // autoFocus={autoFocus}

      severity={severity}
      rounded={rounded}
      tooltip={tooltip}
      text={text}
    >
      {/* <span className="mx-2">{children}</span> */}
    </Btn>
  );
};
