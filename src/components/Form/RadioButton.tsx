import { RadioButton as Input } from 'primereact/radiobutton';
import { Controller } from 'react-hook-form';
import { styled } from 'styled-components';

const Wrapper = styled.label`
  display: flex;
  gap: 10px;
  small {
    font-size: 1rem;
  }
`;
type RadioButtonProps = {
  value: string;
  label: string;
  name: string;
  control: any;
  required?: boolean;
};
export const RadioButton = ({ name, value, control, label, required = true }: RadioButtonProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required }}
    render={({ field }) => (
      <Wrapper>
        <Input id={value} inputId={value} {...field} value={value} checked={field.value === value} />
        <small>{label}</small>
      </Wrapper>
    )}
  />
);
