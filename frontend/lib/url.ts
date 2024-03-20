/**
 * functions works with urls
 */

import { IQuiz, getDefaultQuiz, getQuestionIndexBySlug } from "./data";

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
  const defaultQuiz = getDefaultQuiz()
  return getUrlByQuestionIndex(defaultQuiz, 0)
}


export function getUrlByQuestionIndex(quiz:IQuiz, index: number) : string|null {
  if (quiz.questions[index] === undefined) {
    return null
  }

  return getQuizUrl(quiz, getQuestionSlugByIndexAndContent(index, quiz.questions[index].text))
}

// get the URL belongs to quiz
function getQuizUrl(quiz:IQuiz, path:string | null | undefined): string { 
  if (path === null || path === undefined) {
    return quiz.slug
  }

  return quiz.slug+"/"+path
}

export function getQuestionSlugByIndexAndContent(index:number, content:string): string {
  return (index+1)+"-"+slugify(content)
}


export function getNextQuestionSlug(quiz:IQuiz, currentQuiestionSlug: string) : string|boolean|null {
  const index = getQuestionIndexBySlug(currentQuiestionSlug)
  if (index === null) {
    return null
  }

  const url = getUrlByQuestionIndex(quiz, index+1)
  if (!url) {
    return getFullUrl(getQuizUrl(quiz, '/summary' || '/'))
  }

  return getFullUrl(url)
}

export function getFullUrl(path:string):string{
  return process.env.APP_BASE_URL + path
}
