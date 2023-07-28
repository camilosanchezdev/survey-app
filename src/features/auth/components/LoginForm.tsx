import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { InputField } from '@/components/Form/InputField';
import { Breakpoints } from '@/utils/breakpoints';

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
    margin: 20px 0;
    gap: 10px;
  }
`;

interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = () => {
    // TODO: connect with API - remove localstorage
    localStorage.setItem('islogged', 'true');
    location.reload();
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
      <div className="action">
        <Button type="submit" label="Login" />
      </div>
    </Wrapper>
  );
};
