import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '@/components/Elements/Button';
import { Checkbox } from '@/components/Form/Checkbox';
import { RadioButton } from '@/components/Form/RadioButton';
import { PUBLIC_ROUTES } from '@/routes/public';
import storage from '@/utils/storage';
import { CreateSurveyResponseDTO, useCreateSurveyResponse } from '../api/createSurveyResponse';
import { useSurveyByPublicLink } from '../api/getSurveyByPublicLink';

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

export const PublicSurvey = () => {
  const navigate = useNavigate();
  const createSurveyResponseMutation = useCreateSurveyResponse();
  const params = useParams();
  const { control, handleSubmit } = useForm();
  const { isLoading, data } = useSurveyByPublicLink({ publicLink: String(params?.id) });

  const navigateToSuccess = useCallback(() => {
    navigate(`${PUBLIC_ROUTES.SURVEY}/${params?.id}/success`);
  }, [navigate, params]);
  const createRequest = (publicLink: string, data: any): CreateSurveyResponseDTO => {
    return {
      publicLink,
      questions: Object.entries(data).map(([key, value]) => ({
        questionId: Number(key),
        answers: Array.isArray(value)
          ? value.map((el: string) => ({ answerId: Number(el) }))
          : [{ answerId: Number(value) }],
      })),
    };
  };
  const saveResponse = async (body: CreateSurveyResponseDTO) => {
    const res = await createSurveyResponseMutation.mutateAsync(body);
    if (res.success) {
      storage.setData(String(params?.id), String(params?.id));
      navigateToSuccess();
    }
  };
  const onSubmit: SubmitHandler<any> = async (form) => {
    const res = createRequest(String(params?.id), form);
    saveResponse(res);
  };
  useEffect(() => {
    const publicLink = storage.getData(String(params?.id));
    if (publicLink) {
      navigateToSuccess();
    }
  }, [navigateToSuccess, params]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Not Found</p>;
  return (
    <>
      <Title>{data.title}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {data.surveyQuestions.map((item, key) => (
          <FormControl key={`${key}-${item.id}`}>
            <h3>{`${key + 1}. ${item.name}`}</h3>
            {item.multiple
              ? item.surveyAnswers?.map((answer) => (
                  <Checkbox
                    key={answer.id}
                    id={String(answer.id)}
                    label={answer.name}
                    name={String(item.id)}
                    control={control}
                  />
                ))
              : item.surveyAnswers?.map((answer) => (
                  <RadioButton
                    key={answer.id}
                    value={String(answer.id)}
                    label={answer.name}
                    name={String(item.id)}
                    control={control}
                  />
                ))}
          </FormControl>
        ))}
        <Actions>
          <Button label="Send" type="submit" icon="pi pi-send" />
        </Actions>
      </Form>
    </>
  );
};
