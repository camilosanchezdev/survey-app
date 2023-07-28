import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { InputField } from '@/components/Form/InputField';
import { RadioButton } from '@/components/Form/RadioButton';
import { SurveyQuestionType } from '../enums/survey-question-type.enum';
import { IQuestionForm } from '../interfaces/question-form.interface';

const Form = styled.form`
  /* background-color: red; */
`;
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
  type: string;
  answer: string;
}

type AddQuestionModalProps = {
  addQuestion: (questionToAdd: IQuestionForm) => void;
};
export const AddQuestionModal = ({ addQuestion }: AddQuestionModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerInput[]>([]);
  const { register, handleSubmit, watch, reset, control } = useForm({
    defaultValues: {
      question: '',
      type: String(SurveyQuestionType.SIMPLE),
      answer: '',
    },
  });
  const answerInput = watch('answer');
  const typeInput = watch('type');
  const closeModal = () => {
    setAnswers([]);
    reset({ question: '', type: String(SurveyQuestionType.SIMPLE) });
    setVisible(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = (form) => {
    // if (answers.length < 2) return displayError(); // TODO: dispatch error notification
    const { question, type } = form;
    const newQuestion: IQuestionForm = { question, type: Number(type), answers: answers.map((ans) => ans.name) };
    addQuestion(newQuestion);
    console.log('form', newQuestion);
    closeModal();
  };
  const addNewAnswer = () => {
    if (!answerInput) return;
    if (answers.findIndex((ans) => ans.name === answerInput) !== -1) return;

    setAnswers([...answers, { name: answerInput }]);
    reset({ type: typeInput, answer: '' });
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
      <Button label="Add question" icon="pi pi-plus" type="button" onClick={() => setVisible(true)} />
      <Dialog
        header="Add a new question"
        visible={visible}
        draggable={false}
        style={{ width: '25vw' }}
        onHide={() => closeModal()}
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
              <RadioButton value={String(SurveyQuestionType.SIMPLE)} label="Simple" name="type" control={control} />
              <RadioButton value={String(SurveyQuestionType.MULTIPLE)} label="Multiple" name="type" control={control} />
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
            {/* <ul>
              <li>Respuesta 1</li>
              <li>Respuesta 2</li>
              <li>Respuesta 3</li>
              <li>Respuesta 4</li>
            </ul> */}
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
