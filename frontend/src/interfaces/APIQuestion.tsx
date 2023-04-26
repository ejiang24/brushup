//interface for a particular question

export interface APIQuestion {
    question: string;
    funFact: string;
    answer: Array<string>;
    corrAns: string;
    imgPath: string;
}
