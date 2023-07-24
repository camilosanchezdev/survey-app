export interface ISurvey {
  id: number;
  title: string;
  description: string;
  status: { id: number; name: string };
  createdat: string;
  endsDate: string;
  link: string;
  tags: { id: number; name: string }[];
  questions: QuestionModel[];
}
interface QuestionModel {
  id: number;
  name: string;
  multiple: boolean;
  answers: AnswerModel[];
}
interface AnswerModel {
  id: number;
  name: string;
}
