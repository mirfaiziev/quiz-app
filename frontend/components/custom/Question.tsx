import { IQuestion } from "@/lib/interfaces"
import Answers from "./Answers"

interface QuestionProps {
  question: IQuestion,
  nextSlug: string
}

const Question = ({question, nextSlug}:QuestionProps) => {
  return (
    <section>
      <h1 className="quiz-question">{question.question}</h1>
      <Answers answers={question.answers} nextSlug={nextSlug}/>
    </section>
  )
}

export default Question