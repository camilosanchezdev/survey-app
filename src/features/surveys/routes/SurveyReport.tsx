import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Navbar } from '@/components/Layout/Navbar';
import { SurveyQuestionType } from '../enums/survey-question-type.enum';
import { IQuestionForm } from '../interfaces/question-form.interface';

const Wrapper = styled.section`
  min-height: 100vh;
  margin: 3px 0;
`;
const Content = styled.div`
  margin: 0 20px;
`;
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
`;
const Actions = styled.div`
  margin: 40px 0;
  display: flex;
  gap: 20px;
  button {
    width: 250px;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  justify-content: center;
  margin: 20px 0;
  button {
    height: 40px;
    width: 120px;
  }
`;

const mockedQuestions: IQuestionForm[] = [
  {
    question: '¿Cuantas veces vas al supermercado a la semana?',
    type: SurveyQuestionType.SIMPLE,
    answers: ['test', 'test2'],
  },
  {
    question: '¿Qué tecnologías te interesan más?',
    type: SurveyQuestionType.MULTIPLE,
    answers: ['React', 'Angular', 'Vue'],
  },
];

export const SurveyReport = () => {
  const [questions] = useState<IQuestionForm[]>(mockedQuestions);
  return (
    <Wrapper>
      <Navbar title="Survey Report" icon="pi pi-file" navigation />
      <Content>
        <Header>
          <Title>Survey Prueba title title</Title>
          <p>221 responses</p>
        </Header>

        <Form>
          {questions.map((item, key) => (
            <FormControl key={`${key}-${item.question}`}>
              <h3>{`${key + 1}. ${item.question}`}</h3>
            </FormControl>
          ))}
        </Form>
        <Actions>
          <Button label="Download Report - PDF" severity="info" type="button" icon="pi pi-file-pdf" />
          <Button label="Download Data - CSV" severity="success" type="button" icon="pi pi-file-excel" />
        </Actions>
      </Content>
    </Wrapper>
  );
};
