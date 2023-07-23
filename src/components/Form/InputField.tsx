import { InputText } from 'primereact/inputtext';

type InputFieldProps = {
  type?: 'text' | 'email' | 'password';
  id: string;
  className?: string;
  register?: any;
  name: string;
  placeholder: string;
};

export const InputField = ({ type = 'text', id, register, name, placeholder }: InputFieldProps) => (
  <InputText id={id} type={type} placeholder={placeholder} {...(register && register(name))} />
);
