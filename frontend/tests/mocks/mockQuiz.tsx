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

const mockQuiz2 = {
  result: "success",
  quiz: {
    questions: [
      {
        question: "Fav cs32 professor",
        funFact: "Nim Telson is silly",
        ans: ["Tim Nelson", "Ariana grande", "Lana", "Taylor"],
        corrAns: "Tim Nelson",
        imgPath: "yuh",
      },
      {
        question: "Least favorite cs32 professor",
        funFact: "caroline loves starbucks",
        ans: ["nim telson", "null", "lady gaga", "anya taylor joy"],
        corrAns: "null",
        imgPath: "jskdfj",
      },
    ],
  },
};

export { mockQuestion, mockQuiz, mockQuiz2 };
