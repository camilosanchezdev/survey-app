import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { InputField } from '@/components/Form/InputField';
import { RadioButton } from '@/components/Form/RadioButton';
import { displayNotification } from '@/components/Notifications/notificationSlice';
import { useAppDispatch } from '@/hooks/typedReduxHooks';
import { SurveyAnswersType } from '../types/survey-answer.type';
import { SurveyQuestionType } from '../types/survey-question.type';

const Form = styled.form``;
const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  label {
    font-weight: bold;
  }
`;
const FormControlRadio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  span {
    margin: 0 0 10px 0;
    font-weight: bold;
  }
`;
const FormControlRadioButtons = styled.div`
  display: flex;
  gap: 20px;
`;
const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 20px 0 0 0;
  gap: 20px;
  button {
    width: 100%;
  }
`;

interface AnswerInput {
  name: string;
}

interface IFormInput {
  question: string;
  multiple: boolean;
  answer: string;
}

type AddQuestionModalProps = {
  openModal: boolean;
  closeModal: () => void;
  addQuestion: (questionToAdd: SurveyQuestionType) => void;
};
export const AddQuestionModal = ({ openModal, addQuestion, closeModal }: AddQuestionModalProps) => {
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState<SurveyAnswersType[]>([]);
  const { register, handleSubmit, watch, reset, control } = useForm({
    defaultValues: {
      question: '',
      multiple: false,
      answer: '',
    },
  });
  const answerInput = watch('answer');
  const multipleInput = watch('multiple');
  const closeFormModal = () => {
    setAnswers([]);
    reset({ question: '', multiple: false });
    closeModal();
  };

  const onSubmit: SubmitHandler<IFormInput> = (form) => {
    if (answers.length < 2)
      return dispatch(
        displayNotification({ severity: 'error', summary: 'Error', detail: 'You must add at least two answers' }),
      );
    const { question, multiple } = form;
    const newQuestion: SurveyQuestionType = {
      name: question,
      multiple: multiple,
      surveyAnswers: answers.map((ans) => ({ name: ans.name })),
    };
    addQuestion(newQuestion);
    closeFormModal();
  };
  const addNewAnswer = () => {
    if (!answerInput) return;
    if (answers.findIndex((ans) => ans.name === answerInput) !== -1) return;

    setAnswers([...answers, { name: answerInput }]);
    reset({ multiple: multipleInput, answer: '' });
  };
  const removeAnswer = (answer: string) => {
    setAnswers(answers.filter((r) => r.name !== answer));
  };
  const actionBodyTemplate = (answer: AnswerInput) => (
    <Button
      icon="pi pi-trash"
      rounded
      outlined
      severity="danger"
      onClick={() => removeAnswer(answer.name)}
      tooltip="Remove"
    />
  );

  return (
    <>
      <Dialog
        header="Add a new question"
        visible={openModal}
        draggable={false}
        style={{ width: '25vw' }}
        onHide={() => closeFormModal()}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <label htmlFor="question">Question</label>
            <InputField
              id="question"
              register={register('question', { required: true })}
              placeholder="Write some question..."
            />
          </FormControl>
          <FormControlRadio>
            <span>Answers</span>
            <FormControlRadioButtons>
              <RadioButton value={false} label="Simple" name="multiple" control={control} />
              <RadioButton value={true} label="Multiple" name="multiple" control={control} required={false} />
            </FormControlRadioButtons>
          </FormControlRadio>

          <FormControl>
            <label htmlFor="answer">Answers</label>
            {answers.length > 0 ? (
              <DataTable value={answers}>
                <Column field="name" style={{ width: '80%' }}></Column>
                <Column body={actionBodyTemplate} field="code"></Column>
              </DataTable>
            ) : null}

            <div className="p-inputgroup">
              <InputField id="answer" register={register('answer')} placeholder="Add answer..." />
              <Button icon="pi pi-plus" type="button" onClick={() => addNewAnswer()} />
            </div>
          </FormControl>
          <Actions>
            <Button label="Cancel" icon="pi pi-plus" type="button" severity="secondary" onClick={() => closeModal()} />
            <Button label="Save" icon="pi pi-plus" type="submit" severity="info" onClick={() => {}} />
          </Actions>
        </Form>
      </Dialog>
    </>
  );
};
