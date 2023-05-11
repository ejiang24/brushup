/**
 * This represents the form of a question that the API sends to the frontend.
*/

export interface APIQuestion {
    question: string;
    funFact: string;
    answer: Array<string>;
    corrAns: string;
    imgPath: string;
}
