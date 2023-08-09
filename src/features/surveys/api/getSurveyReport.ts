import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { SurveyReport } from '../types/survey-report.type';

export const getSurveyReport = (surveyId: number): Promise<SurveyReport> => {
  return axios.get(`/survey-responses/${surveyId}/report`);
};

type QueryFnType = typeof getSurveyReport;

type UseSurveysptions = {
  config?: QueryConfig<QueryFnType>;
  surveyId: number;
};

export const useSurveyReport = ({ config = {}, surveyId }: UseSurveysptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['survey-report'],
    queryFn: () => getSurveyReport(surveyId),
  });
};
