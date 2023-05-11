import { APIQuestion } from "./APIQuestion";
/**
 * This represents the API response that contains whether the call to the API was successful and the
 * generated quiz.
*/

export interface APIQuiz {
  result: string;
  quiz: {questions: Array<APIQuestion>};
}
