import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Checkbox } from '@/components/Form/Checkbox';
import { InputField } from '@/components/Form/InputField';
import { InputTextarea } from '@/components/Form/InputTextarea';
import { RadioButton } from '@/components/Form/RadioButton';
import { displayNotification } from '@/components/Notifications/notificationSlice';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import { SurveyQuestionType } from '../enums/survey-question-type.enum';
import { IQuestionForm } from '../interfaces/question-form.interface';
import { AddQuestionModal } from './AddQuestionModal';

const Wrapper = styled.div`
  width: 100%;
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
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState<IQuestionForm[]>([]);
  const [openQuestionFormModal, setOpenQuestionFormModal] = useState(false);
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
    if (questions.length === 0)
      return dispatch(
        displayNotification({ severity: 'error', summary: 'Error', detail: 'You must add at least one question' }),
      );

    const request = createRequest(form);
    console.log('request', request);
  };
  const handleAddQuestion = (questionToAdd: IQuestionForm) => {
    setQuestions([...questions, questionToAdd]);
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <label htmlFor="title">Title</label>
          <InputField id="title" register={register('title', { required: true })} />
        </FormControl>
        <FormControl>
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" register={register('description', { required: true })} />
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
        <Button label="Add question" icon="pi pi-plus" type="button" onClick={() => setOpenQuestionFormModal(true)} />
        <Actions>
          <Button label="Save as Draft" severity="warning" type="button" icon="pi pi-save" />
          <Button label="Create Survey" severity="info" type="submit" icon="pi pi-send" />
        </Actions>
      </Form>

      <AddQuestionModal
        addQuestion={handleAddQuestion}
        openModal={openQuestionFormModal}
        closeModal={() => setOpenQuestionFormModal(false)}
      />
    </Wrapper>
  );
};
