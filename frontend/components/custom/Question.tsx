import { IQuestion } from "@/lib/data"
import Answers from "./Answers"

interface QuestionProps {
  question: IQuestion,
  nextSlug: string|boolean,
  questionIndex: number,
  isFinalQuestion: boolean
}

const Question = ({question, nextSlug, questionIndex, isFinalQuestion}:QuestionProps) => {
  return (
    <section>
      <h1 className="quiz-question">{question.question}</h1>
      <Answers 
        answers={question.answers} 
        nextSlug={nextSlug} 
        questionIndex={questionIndex} 
        isFinalQuestion={isFinalQuestion}
      />
    </section>
  )
}

export default Question