import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { PieChart } from '@/components/Elements/PieChart';
import { Navbar } from '@/components/Layout/Navbar';
import { SurveyQuestionType } from '../enums/survey-question-type.enum';
import { IQuestionReport } from '../interfaces/question-report.interface';

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
// TODO: remove
const mockedQuestions: IQuestionReport[] = [
  {
    question: '¿Cuantas veces vas al supermercado al mes?',
    type: SurveyQuestionType.SIMPLE,
    answers: [
      { id: '1 vez', value: '5' },
      { id: '2 veces', value: '4' },
      { id: '3 veces o más', value: '1' },
    ],
  },
  {
    question: '¿Qué tecnologías te interesan más?',
    type: SurveyQuestionType.MULTIPLE,
    answers: [
      { id: 'React', value: '15' },
      { id: 'Angular', value: '4' },
      { id: 'Vue', value: '12' },
    ],
  },
];

export const SurveyReport = () => {
  const [questions] = useState<IQuestionReport[]>(mockedQuestions);

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
              <PieChart data={item.answers} />
            </FormControl>
          ))}
        </Form>
        <Actions>
          <Button label="Download Report - PDF" severity="danger" type="button" icon="pi pi-file-pdf" />
          <Button label="Download Data - CSV" severity="success" type="button" icon="pi pi-file-excel" />
        </Actions>
      </Content>
    </Wrapper>
  );
};
