import { InputText } from 'primereact/inputtext';

type InputFieldProps = {
  type?: 'text' | 'email' | 'password';
  id: string;
  className?: string;
  register: any;
  placeholder?: string;
  disabled?: boolean;
  color?: string;
};

export const InputField = ({ type = 'text', id, register, placeholder, disabled, color }: InputFieldProps) => (
  <InputText id={id} type={type} placeholder={placeholder} disabled={disabled} style={{ color }} {...register} />
);
