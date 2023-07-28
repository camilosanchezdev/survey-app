import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Checkbox } from '@/components/Form/Checkbox';
import { InputField } from '@/components/Form/InputField';
import { InputTextarea } from '@/components/Form/InputTextarea';
import { RadioButton } from '@/components/Form/RadioButton';
import { SurveyQuestionType } from '../enums/survey-question-type.enum';
import { IQuestionForm } from '../interfaces/question-form.interface';
import { AddQuestionModal } from './AddQuestionModal';

const Wrapper = styled.form`
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
  display: flex;
  gap: 20px;
  button {
    width: 100%;
  }
`;
interface CreateSurveyRequest {
  title: string;
  description: string;
  questions: IQuestionForm[];
}

interface IFormInput {
  title: string;
  description: string;
}
export const CreateSurveyForm = () => {
  const [questions, setQuestions] = useState<IQuestionForm[]>([]);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const createRequest = (form: IFormInput): CreateSurveyRequest => {
    return {
      title: form.title,
      description: form.description,
      questions: questions,
    };
  };
  const onSubmit: SubmitHandler<IFormInput> = (form) => {
    // if (questions.length === 0) return; TODO: dispatch error notification

    const request = createRequest(form);
    console.log('request', request);
  };
  const handleAddQuestion = (questionToAdd: IQuestionForm) => {
    setQuestions([...questions, questionToAdd]);
  };
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <label htmlFor="title">Title</label>
        <InputField id="title" register={register('title')} />
      </FormControl>
      <FormControl>
        <label htmlFor="description">Description</label>
        <InputTextarea id="description" register={register} name="description" />
      </FormControl>
      {questions.map((item, key) => (
        <FormControl key={`${key}-${item.question}`}>
          <h2>{`${key + 1}. ${item.question}`}</h2>
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
      <AddQuestionModal addQuestion={handleAddQuestion} />
      <Actions>
        <Button label="Save as Draft" severity="warning" type="button" icon="pi pi-save" />
        <Button label="Create Survey" severity="info" type="submit" icon="pi pi-send" />
      </Actions>
    </Wrapper>
  );
};
