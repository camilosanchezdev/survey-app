import { styled } from 'styled-components';

const Wrapper = styled.nav`
  background-color: white;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 0 0 20px 0;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    font-weight: 200;
    span {
      background: #dbeefa;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 1.2rem;
        color: #005ca7;
      }
    }
  }
`;

type NavbarProps = {
  title: string;
  icon: string;
};
export const Navbar = ({ title, icon }: NavbarProps) => {
  return (
    <Wrapper>
      <div>
        <span>
          <i className={icon}></i>
        </span>
        <h1>{title}</h1>
      </div>
    </Wrapper>
  );
};
