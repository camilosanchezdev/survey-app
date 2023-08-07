import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { SurveyType } from '../types/survey.type';

export const getSurvey = (surveyId: number): Promise<SurveyType> => {
  return axios.get(`/surveys/${surveyId}`);
};

type QueryFnType = typeof getSurvey;

type UseSurveysptions = {
  config?: QueryConfig<QueryFnType>;
  surveyId: number;
};

export const useSurvey = ({ config = {}, surveyId }: UseSurveysptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['surveys'],
    queryFn: () => getSurvey(surveyId),
  });
};
