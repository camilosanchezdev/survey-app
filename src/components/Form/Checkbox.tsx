import { Checkbox as Input } from 'primereact/checkbox';
import { useState } from 'react';
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
  id: string;
  label: string;
  name: string;
  control: any;
  required?: boolean;
};

export const Checkbox = ({ id, name, control, label, required = true }: CheckboxProps) => {
  const [state, setState] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: props }) => {
        return (
          <Wrapper>
            <Input
              {...props}
              value={id}
              checked={state}
              onChange={(e) => {
                setState(Boolean(e.checked));
                if (e.checked) {
                  props.onChange(props.value ? [...props.value, id] : [id]);
                } else {
                  props.onChange(props.value.filter((x: any) => x === id));
                }
              }}
            />
            <small>{label}</small>
          </Wrapper>
        );
      }}
    />
  );
};
