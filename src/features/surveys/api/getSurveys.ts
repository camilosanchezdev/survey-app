import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { SurveyListItemResult } from '../types';

export const getSurveys = (
  take: number = 10,
  skip: number = 0,
  surveyStatusId?: number,
): Promise<SurveyListItemResult> => {
  const filter = surveyStatusId ? `&filters=${surveyStatusId}` : '';
  const skipRecord = skip ? `&skip=${skip}` : '';
  return axios.get(`/surveys?take=${take}${skipRecord}${filter}`);
};

type QueryFnType = typeof getSurveys;

type UseSurveysptions = {
  config?: QueryConfig<QueryFnType>;
  take: number;
  skip: number;
  surveyStatusId?: number;
};

export const useSurveys = ({ config = {}, take, skip, surveyStatusId }: UseSurveysptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['surveys'],
    queryFn: () => getSurveys(take, skip, surveyStatusId),
  });
};
