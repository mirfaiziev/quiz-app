/**
 * functions works with data
 */

import { Quizes } from "@/data/quiz";
import { getQuestionSlugByIndexAndContent } from "./url";

// interfaces
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

// methods
export function getDefaultQuiz():IQuiz {
  return Quizes.filter((quiz:IQuiz) => {return quiz.default === true})[0] 
}

export function getQuestionBySlug(quiz:IQuiz, quiestionSlug: string): IQuestion|null {
  const index = getQuestionIndexBySlug(quiestionSlug)
  if (index === null) {
    return null
  }

  if (quiz.questions[index] === undefined) {
    return null
  }

  return quiz.questions[index]
}



export function getQuizBySlug(slug:string): IQuiz|null {
  const quiz = Quizes.filter((quiz:IQuiz) => {return quiz.slug === slug.toLowerCase()})

  if (quiz.length !== 1) {
    return null
  }

  return quiz[0]
}

export function getQuestionIndexBySlug(questionSlug: string): number | null {
  const index = parseInt(questionSlug.split('-')[0])
  if (isNaN(index)) {
    return null
  }
  return index - 1
}


interface dynamicsParams {
  quiz: string,
  question: string
}

export function getDynamicParams(): Array<dynamicsParams> {
  let params:Array<dynamicsParams> = [];
  
  Quizes.forEach((quizObj:IQuiz) => {
    quizObj.questions.forEach((questionObj:IQuestion, index:number) => {
      params.push({quiz:quizObj.slug, question:getQuestionSlugByIndexAndContent(index,questionObj.question)})
    })
  })

  return params
}