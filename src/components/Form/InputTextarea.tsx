import { InputTextarea as Input } from 'primereact/inputtextarea';

type InputTextareaProps = {
  id: string;
  register: any;
  rows?: number;
  cols?: number;
};
export const InputTextarea = ({ register, id, rows = 5, cols = 30 }: InputTextareaProps) => {
  return <Input rows={rows} cols={cols} id={id} {...register} />;
};
