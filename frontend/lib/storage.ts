/**
 * functions works with local storage
 */

const STORAGE_KEY = "answeredQuestions"

// interfaces

// store answers as {questionId, answerIndex}
export interface storedAnswers {
  [questionIndex:number]:number
}


export function initLocalStorage() {
  const obj:storedAnswers = {}

  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
}

export function storeAnswer(questionIndex:number, answerValue:string):boolean {
  const storedItem = localStorage.getItem(STORAGE_KEY) 
  if (!storedItem) {
    return false
  }

  let storedObj = JSON.parse(storedItem);
  if (!storedObj) {
      return false
  }

  storedObj = {...storedObj, [questionIndex]: answerValue};

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedObj))

  return true
}

export function getAnswers():storedAnswers|null {
  const storedItem = localStorage.getItem(STORAGE_KEY)

  if (!storedItem) {
    return null
  }
  let storedObj = JSON.parse(storedItem);
  if (!storedObj) {
      return null
  }

  return storedObj
}