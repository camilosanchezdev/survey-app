import { SurveyQuestionType } from './survey-question.type';

export type SurveyType = {
  id: number;
  title: string;
  description: string;
  public: string;
  surveyStatusId: number;
  surveyQuestions: SurveyQuestionType[];
};
