import { Checkbox as Input } from 'primereact/checkbox';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.label`
  display: flex;
  gap: 10px;
  small {
    font-size: 1rem;
  }
`;
type CheckboxProps = {
  label: string;
  name: string;
  control: any;
  required?: boolean;
};

export const Checkbox = ({ name, control, label, required = true }: CheckboxProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required }}
    render={({ field }) => (
      <Wrapper>
        <Input id={name} {...field} checked={field.value} />
        <small>{label}</small>
      </Wrapper>
    )}
  />
);
