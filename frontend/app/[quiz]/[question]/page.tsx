import Loader from "@/components/custom/Loader"
import Question from "@/components/custom/Question"
import { getQuizBySlug, getDynamicParams, getQuestionBySlug, getQuestionIndexBySlug } from "@/lib/data"
import { getNextQuestionSlug} from "@/lib/url"
import { notFound } from "next/navigation"
import { Suspense } from "react"

interface QuestionPageParams{
  quiz: string,
  question: string
}

export default function QuestionPage({params}: {params: QuestionPageParams}) {
  const quiz = getQuizBySlug(params.quiz)
  if (quiz === null) {
    console.log("cannot find quiz")
    return notFound()
  }

  const question = getQuestionBySlug(quiz, params.question)
  if (question === null) {
    console.log("cannot find question by slug")
    return notFound()
  }
  const questionIndex = getQuestionIndexBySlug(params.question)
  if (questionIndex === null) {
    console.log("cannot find question index by slug")

    return notFound()
  }

  const nextQuestionSlug = getNextQuestionSlug(quiz, params.question)
  if (nextQuestionSlug === null) {
    console.log("error durign getting next question slug")
    return notFound()
  }

  return (
    <Suspense fallback={<Loader />}>
      <Question 
        question={question} 
        nextSlug={nextQuestionSlug} 
        questionIndex={questionIndex}
      />
    </Suspense>
  )
}

// need for build
export const generateStaticParams = async () => {
  return getDynamicParams();
}