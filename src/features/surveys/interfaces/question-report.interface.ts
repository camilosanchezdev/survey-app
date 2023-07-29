export interface IQuestionReport {
  question: string;
  type: number;
  answers: Array<{ id: string; value: string }>;
}
