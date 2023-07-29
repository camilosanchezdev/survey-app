import styled from 'styled-components';
import logo from '@/assets/img/logo.png';

const Wrapper = styled.main`
  background: #eeeeee;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  background-color: white;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.13);
`;
const Image = styled.img`
  width: 200px;
`;
const Body = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px;
  color: #535353;
`;
const Content = styled.div`
  position: relative;
  background-color: white;
  width: 60%;
  padding: 40px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.13);
`;

type PublicLayoutProps = {
  children: React.ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => (
  <Wrapper>
    <Header>
      <Image src={logo} alt="Survey Maker" title="Survey Maker" />
    </Header>
    <Body>
      <Content>{children}</Content>
    </Body>
  </Wrapper>
);
