import Question from "@/components/custom/Question"
import { getQuestionBySlug, getQuizBySlug } from "@/lib/url"
import { notFound } from "next/navigation"

interface QuestionPageParams{
  quiz: string,
  question: string
}
export default function QuestionPage({params}: {params: QuestionPageParams}) {
  const quiz = getQuizBySlug(params.quiz)
  if (!quiz) {
    return notFound()
  }

  const question = getQuestionBySlug(quiz, params.question)
  if (!question) {
    return notFound()
  }

  return (
    <Question question={question} />
  )

}
