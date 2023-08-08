import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BaseResponse } from '@/types/base-response.type';

type CreateSurveyDTO = {
  title: string;
  description: string;
  surveyQuestions: { name: string; multiple: boolean; surveyAnswers: { name: string }[] }[];
};

const createSurvey = (data: CreateSurveyDTO): Promise<BaseResponse> => {
  return axios.post(`/surveys`, data);
};

type UseUpdateSurveyOptions = {
  config?: MutationConfig<typeof createSurvey>;
};

export const useCreateSurvey = ({ config }: UseUpdateSurveyOptions = {}) => {
  return useMutation({
    onSuccess: () => {},
    ...config,
    mutationFn: createSurvey,
  });
};
