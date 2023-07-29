import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';

import { Button } from '@/components/Elements/Button';
import { Checkbox } from '@/components/Form/Checkbox';
import { RadioButton } from '@/components/Form/RadioButton';
import { SurveyQuestionType } from '../enums/survey-question-type.enum';
import { IQuestionForm } from '../interfaces/question-form.interface';

const Title = styled.h2`
  margin: 0 0 40px 0;
  text-align: Center;
  font-size: 2rem;
`;
const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Actions = styled.div`
  width: 100%;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  margin: 40px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  button {
    width: 250px;
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

export const PublicSurvey = () => {
  const [questions] = useState<IQuestionForm[]>(mockedQuestions);
  const { control } = useForm();
  return (
    <>
      <Title>Survey Prueba title title</Title>
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
        <Button label="Send" type="button" icon="pi pi-send" />
      </Actions>
    </>
  );
};
