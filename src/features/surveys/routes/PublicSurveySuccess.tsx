import { styled } from 'styled-components';

const Wrapper = styled.div`
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h2`
  text-align: center;
`;
const Text = styled.p`
  text-align: center;
`;

export const PublicSurveySuccess = () => {
  return (
    <Wrapper>
      <Title>Thank you for your time and your answers</Title>
      <Text>Your opinion is important to us. Your answers will be used responsibly</Text>
    </Wrapper>
  );
};
