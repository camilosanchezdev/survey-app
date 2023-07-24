export interface ISurveyListItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  status: {
    id: number;
    name: string;
  };
}
