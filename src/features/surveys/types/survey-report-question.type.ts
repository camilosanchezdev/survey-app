import { SurveyReportAnswer } from './survey-report-answer.type';

export type SurveyReportQuestion = {
  id: number;
  name: string;
  surveyAnswers: SurveyReportAnswer[];
};
