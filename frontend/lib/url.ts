/**
 * functions works with urls
 */

import { Quizes } from "@/data/quiz";
import { IQuestion, IQuiz, IQuizes } from "./interfaces";

// todo: move it to env
const BASE_URL = "/"

// transform string to slug
function slugify(input?: string, words?: number): string {
  if (!input)
      return '';

  // make lower case and trim
  let slug = input.toLowerCase().trim();

  // remove accents from charaters
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, '-');

  if (words) {
      return slug.substring(0, slug.split('-', words).join('-').length)
  }

  return slug;
}

export function getStartUrl(): string|null {
  const defaultQuiz = Quizes.filter((quiz:IQuiz) => {return quiz.default === true})[0] 
  return getUrlByQuestionIndex(defaultQuiz, 0)
}

export function getUrlByQuestionIndex(quiz:IQuiz, index: number) : string|null {
  if (quiz.questions[index] === undefined) {
    return null
  }

  return quiz.slug+"/"+(index+1)+"-"+slugify(quiz.questions[index].question);
}

export function getQuizBySlug(slug:string): IQuiz|null {
  const quiz = Quizes.filter((quiz:IQuiz) => {return quiz.slug === slug.toLowerCase()})

  if (quiz.length !== 1) {
    return null
  }

  return quiz[0]
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

export function getNextQuestionSlug(quiz:IQuiz, quiestionSlug: string) : string {
  const index = getQuestionIndexBySlug(quiestionSlug)
  if (index === null) {
    return getFullUrl("result")
  }

  if (quiz.questions[index+1] === undefined) {
    return getFullUrl("result")
  }

  const url = getUrlByQuestionIndex(quiz, index+1)
  if (!url) {
    return getFullUrl("result")
  }

  return getFullUrl(url)
}

export function getFullUrl(path:string):string{
  return BASE_URL + path
}

function getQuestionIndexBySlug(questionSlug: string): number | null {
  const index = parseInt(questionSlug.split('-')[0])
  if (isNaN(index)) {
    return null
  }
  return index - 1
}
