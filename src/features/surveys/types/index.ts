import { BaseEntity } from '@/types';

export type SurveyListItem = {
  title: string;
  description: string;
  surveyStatusId: number;
} & BaseEntity;

export type SurveyListItemResult = {
  totalRecords: number;
  data: SurveyListItem[];
};
