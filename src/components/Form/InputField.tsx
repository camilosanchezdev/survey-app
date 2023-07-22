import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

type InputFieldProps = {
  type?: 'text' | 'email' | 'password';
  className?: string;
};

export const InputField = (props: InputFieldProps) => {
  const [value, setValue] = useState<string>('');
  const { type = 'text' } = props;
  return <InputText value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />;
};
