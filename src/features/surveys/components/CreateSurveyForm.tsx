import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Checkbox } from '@/components/Form/Checkbox';
import { InputField } from '@/components/Form/InputField';
import { InputTextarea } from '@/components/Form/InputTextarea';
import { RadioButton } from '@/components/Form/RadioButton';
import { displayNotification } from '@/components/Notifications/notificationSlice';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import { PRIVATE_ROUTES } from '@/routes/protected';
import { useCreateSurvey } from '../api/createSurvey';
import { SurveyQuestionType } from '../types/survey-question.type';
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
  surveyQuestions: SurveyQuestionType[];
}

interface IFormInput {
  title: string;
  description: string;
}
export const CreateSurveyForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createSurveyMutation = useCreateSurvey();
  const [questions, setQuestions] = useState<SurveyQuestionType[]>([]);
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
      surveyQuestions: questions,
    };
  };
  const onSubmit: SubmitHandler<IFormInput> = async (form) => {
    if (questions.length === 0)
      return dispatch(
        displayNotification({ severity: 'error', summary: 'Error', detail: 'You must add at least one question' }),
      );

    const request = createRequest(form);
    const res = await createSurveyMutation.mutateAsync(request);
    if (res.success) {
      dispatch(displayNotification({ severity: 'success', summary: 'Success', detail: 'Survey created successfully' }));
      navigate(PRIVATE_ROUTES.SURVEYS);
    } else {
      dispatch(
        displayNotification({ severity: 'error', summary: 'Error', detail: 'You must add at least one question' }),
      );
    }
  };
  const handleAddQuestion = (questionToAdd: SurveyQuestionType) => {
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
          <FormControl key={`${key}-${item.name}`}>
            <h2>{`${key + 1}. ${item.name}`}</h2>
            {item.multiple
              ? item.surveyAnswers.map((answer) => (
                  <Checkbox
                    id={answer.name}
                    key={answer.name}
                    label={answer.name}
                    name={answer.name}
                    control={control}
                    required={false}
                  />
                ))
              : item.surveyAnswers.map((answer) => (
                  <RadioButton
                    key={answer.name}
                    value={answer.name}
                    label={answer.name}
                    name={`${item.name}-${key}`}
                    control={control}
                    required={false}
                  />
                ))}
          </FormControl>
        ))}

        <Actions>
          <Button label="Add question" icon="pi pi-plus" type="button" onClick={() => setOpenQuestionFormModal(true)} />
          {/* <Button label="Save as Draft" severity="warning" type="button" icon="pi pi-save" /> */}
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
