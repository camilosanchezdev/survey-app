import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BaseResponse } from '@/types/base-response.type';

export type CreateSurveyResponseDTO = {
  publicLink: string;
  questions: { questionId: number; answers: { answerId: number }[] }[];
};

const createSurveyResponse = (data: CreateSurveyResponseDTO): Promise<BaseResponse> => {
  return axios.post(`/survey-responses/${data.publicLink}`, data);
};

type UseUpdateSurveyOptions = {
  config?: MutationConfig<typeof createSurveyResponse>;
};

export const useCreateSurveyResponse = ({ config }: UseUpdateSurveyOptions = {}) => {
  return useMutation({
    onSuccess: () => {},
    ...config,
    mutationFn: createSurveyResponse,
  });
};
