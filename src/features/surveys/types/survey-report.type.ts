import { SurveyReportQuestion } from './survey-report-question.type';

export type SurveyReport = {
  id: number;
  title: string;
  description: string;
  totalResponses: number;
  surveyQuestions: SurveyReportQuestion[];
};
