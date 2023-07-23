import styled from 'styled-components';
import background from '@/assets/img/bg-home.png';
import logo from '@/assets/img/logo.png';
import { Breakpoints } from '@/utils/breakpoints';
import { LoginForm } from '../components/LoginForm';

const Wrapper = styled.main`
  min-height: 100vh;
  background-color: gray;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  .image {
    display: none;
    grid-column: span 6 / span 6;
    height: 100%;
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    @media ${Breakpoints.Tablet} {
      display: flex;
    }
  }
  .login {
    grid-column: span 12 / span 12;
    display: flex;
    gap: 80px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(209, 209, 205, 1) 100%);
    @media ${Breakpoints.Tablet} {
      grid-column: span 6 / span 6;
    }
    .logo {
      margin: 0 20px;
      display: flex;
      justify-content: center;
      img {
        width: 80%;
      }
    }
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Home = () => {
  return (
    <Wrapper>
      <div className="image" />
      <div className="login">
        <div className="logo">
          <img src={logo} alt="Survey Maker" title="Survey Maker" />
        </div>
        <div className="content">
          <h1>Welcome back!</h1>
          <h2>Login to your account</h2>
          <LoginForm />
        </div>
      </div>
    </Wrapper>
  );
};
