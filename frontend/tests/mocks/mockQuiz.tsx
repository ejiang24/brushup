const mockQuestion = {
  question: "What is Taylor Swift's most recent album?",
  funFact: "Taylor Swift was born in 1989",
  answer: ["Fearless", "Speak Now", "Midnights", "Lover"],
  corrAns: "Midnights",
  imgPath: "yuh",
};

const mockQuiz = {
  result: "success",
  quiz: {
    questions: [
      {
        question: "What is Taylor Swift's most recent album?",
        funFact: "Taylor Swift was born in 1989",
        ans: ["Fearless", "Speak Now", "Midnights", "Lover"],
        corrAns: "Midnights",
        imgPath: "yuh",
      },
      {
        question: "What is the best Starbucks order?",
        funFact: "caroline loves starbucks",
        ans: ["vsccb", "pink drink", "vanilla frap", "acai refresher"],
        corrAns: "vsccb",
        imgPath: "jskdfj",
      },
    ],
  },
};

export { mockQuestion, mockQuiz };
