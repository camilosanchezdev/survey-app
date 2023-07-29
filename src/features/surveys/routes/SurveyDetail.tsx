import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Checkbox } from '@/components/Form/Checkbox';
import { RadioButton } from '@/components/Form/RadioButton';
import { Navbar } from '@/components/Layout/Navbar';
import { SurveyQuestionType } from '../enums/survey-question-type.enum';
import { IQuestionForm } from '../interfaces/question-form.interface';

const Wrapper = styled.section`
  margin: 3px 0;
`;
const Content = styled.div`
  position: relative;
  min-height: calc(100vh - 205px);
  background-color: white;
  margin: 0 20px 20px 20px;
  padding: 40px;
  border-radius: 20px;
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
  position: absolute;
  bottom: 0;
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
  margin: 20px 0 0 0;
`;
const Menu = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 0 20px 0;
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
export const SurveyDetail = () => {
  const navigate = useNavigate();
  const [questions] = useState<IQuestionForm[]>(mockedQuestions);
  const { control } = useForm();

  return (
    <Wrapper>
      <Navbar title="Survey Detail" icon="pi pi-file" navigation />
      <Content>
        <Header>
          <Menu>
            <Button
              label="Report"
              type="button"
              icon="pi pi-chart-bar"
              onClick={() => navigate('/app/surveys/3/report')}
            />
            <Button label="Share" severity="info" type="button" icon="pi pi-send" />
          </Menu>
          <Title>Survey Prueba title title</Title>
        </Header>

        <Form>
          {questions.map((item, key) => (
            <FormControl key={`${key}-${item.question}`}>
              <h3>{`${key + 1}. ${item.question}`}</h3>
              {item.type === SurveyQuestionType.SIMPLE
                ? item.answers.map((answer) => (
                    <RadioButton
                      key={answer}
                      value={answer}
                      label={answer}
                      name={item.question}
                      control={control}
                      required={false}
                    />
                  ))
                : item.answers.map((answer) => (
                    <Checkbox key={answer} label={answer} name={answer} control={control} required={false} />
                  ))}
            </FormControl>
          ))}
        </Form>
        <Actions>
          <Button label="Mark as Active" severity="info" type="button" icon="pi pi-send" outlined />
          <Button label="Mark as Completed" severity="success" type="button" icon="pi pi-check" outlined />
          <Button label="Mark as Deleted" severity="danger" type="button" icon="pi pi-trash" outlined />
        </Actions>
      </Content>
    </Wrapper>
  );
};
