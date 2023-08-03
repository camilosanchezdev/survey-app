import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { InputField } from '@/components/Form/InputField';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import { authConfig } from '@/lib/auth';
import { PRIVATE_ROUTES } from '@/routes/protected';
import { Breakpoints } from '@/utils/breakpoints';
import { loginAction } from '../state';

const Wrapper = styled.form`
  padding: 0 20px;
  width: 100%;
  margin: 20px 0;
  @media ${Breakpoints.MobileL} {
    width: 70%;
  }
  @media ${Breakpoints.Tablet} {
    width: 70%;
  }
  @media ${Breakpoints.LaptopL} {
    width: 50%;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 0;
    gap: 10px;
  }
`;
const Error = styled.small`
  color: red;
  display: block;
  margin: 10px 0;
`;

const Actions = styled.div`
  margin: 20px 0;
`;
interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (form) => {
    setError(false);
    const { success, successData } = await authConfig.loginFn(form);
    if (success && successData) {
      dispatch(loginAction(successData));
      navigate(PRIVATE_ROUTES.DASHBOARD);
    } else {
      setError(!success);
    }
  };
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <InputField id="email" type="email" register={register('email')} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <InputField id="password" type="password" register={register('password')} />
      </div>
      {error && <Error>Invalid credentials</Error>}
      <Actions>
        <Button type="submit" label="Login" />
      </Actions>
    </Wrapper>
  );
};
