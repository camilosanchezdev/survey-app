import { SurveyAnswersType } from './survey-answer.type';

export type SurveyQuestionType = {
  id?: number;
  name: string;
  multiple: boolean;
  surveyAnswers: SurveyAnswersType[];
};
