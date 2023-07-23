import { InputText } from 'primereact/inputtext';

type InputFieldProps = {
  type?: 'text' | 'email' | 'password';
  id: string;
  className?: string;
  register: any;
  name: string;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', id, register, name } = props;
  return <InputText id={id} type={type} {...register(name)} />;
};
