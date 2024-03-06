export interface IAnswer {
  text: string
}

export interface IQuestion {
  question: string,
  answers: Array<IAnswer>
}

export interface IQuiz {
  default: boolean,
  name: string,
  slug: string,
  questions: Array<IQuestion>
}

export interface IQuizes extends Array<IQuiz>{}
