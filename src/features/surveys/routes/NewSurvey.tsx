import { styled } from 'styled-components';
import { Navbar } from '@/components/Layout/Navbar';
import { CreateSurveyForm } from '../components/CreateSurveyForm';

const Wrapper = styled.section`
  min-height: 100vh;
  margin: 3px 0;
`;
const Content = styled.div`
  margin: 0 10px;
`;

export const NewSurvey = () => {
  return (
    <Wrapper>
      <Navbar title="Create a new Survey" icon="pi pi-file" navigation />
      <Content>
        <CreateSurveyForm />
      </Content>
    </Wrapper>
  );
};
