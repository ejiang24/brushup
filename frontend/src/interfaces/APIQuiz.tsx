import { APIQuestion } from "./APIQuestion";

//interface containing an array of quiz questions
export interface APIQuiz {
  result: string;
  quiz: Array<APIQuestion>;
}
