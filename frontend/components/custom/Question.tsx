import { IQuestion } from "@/lib/interfaces"
import Answers from "./Answers"

interface QuestionProps {
  question: IQuestion
}

const Question = ({question}:QuestionProps) => (
  <section>
    <h1 className="quiz-question">{question.question}</h1>
    <Answers answers={question.answers} />
  </section>
)

export default Question