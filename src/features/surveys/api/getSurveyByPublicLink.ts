import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { SurveyType } from '../types/survey.type';

export const getSurvey = (publicLink: string): Promise<SurveyType> => {
  return axios.get(`/surveys/public/${publicLink}`);
};

type QueryFnType = typeof getSurvey;

type UseSurveysptions = {
  config?: QueryConfig<QueryFnType>;
  publicLink: string;
};

export const useSurveyByPublicLink = ({ config = {}, publicLink }: UseSurveysptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['surveys'],
    queryFn: () => getSurvey(publicLink),
  });
};
