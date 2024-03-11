import { IQuestion } from "@/lib/data"
import Answers from "./Answers"

interface QuestionProps {
  question: IQuestion,
  nextSlug: string|boolean,
  questionIndex: number,
}

const Question = ({question, nextSlug, questionIndex}:QuestionProps) => {
  return (
    <section>
      <h1 className="quiz-question">{question.question}</h1>
      <Answers 
        answers={question.answers} 
        nextSlug={nextSlug} 
        questionIndex={questionIndex} 
      />
    </section>
  )
}

export default Question