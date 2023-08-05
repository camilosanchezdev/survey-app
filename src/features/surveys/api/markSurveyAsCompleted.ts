import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { BaseResponse } from '@/types/base-response.type';

type UpdateSurveyDTO = {
  surveyId: number;
};

const updateSurvey = ({ surveyId }: UpdateSurveyDTO): Promise<BaseResponse> => {
  return axios.put(`/surveys/${surveyId}/completed`);
};

type UseUpdateSurveyOptions = {
  config?: MutationConfig<typeof updateSurvey>;
};

export const useMarkSurveyAsCompleted = ({ config }: UseUpdateSurveyOptions = {}) => {
  return useMutation({
    onSuccess: () => {},
    ...config,
    mutationFn: updateSurvey,
  });
};
