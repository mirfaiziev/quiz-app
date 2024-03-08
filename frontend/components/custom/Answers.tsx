'use client'

import { IAnswer } from "@/lib/data";
import { Button } from "../ui/button";
import { notFound, useRouter } from "next/navigation";
import { storeAnswer } from "@/lib/storage";

interface AnswersProps {
  answers: Array<IAnswer>,
  nextSlug: string|boolean,
  questionIndex: number,
  isFinalQuestion: boolean,
}

const Answers = ({answers, nextSlug, questionIndex, isFinalQuestion}: AnswersProps) => {
  const router = useRouter();

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    const dataset = event.currentTarget.dataset
    const answerIndex = dataset.answerIndex 

    if (answerIndex === undefined) {
      return notFound()
    }

    const storeResult = storeAnswer(questionIndex, parseInt(answerIndex))
    if (storeResult === false) {
      console.log("cannot store result")
    }

    if (isFinalQuestion) {
      router.push('result')
      return
    }

    router.push(dataset.nextSlug || '/')
    return
  }

  return (
    <div>
        {answers.map((answer, index) => (
          <div key={index}>
          <Button
                  type="submit"
                  className="answer-button rounded
                      w-full sm:w-1/2
                      p-6 py-3 my-2 h-24
                      bg-slate-100
                      hover:border-2 hover:border-indigo-500 hover:bg-slate-100
                      text-md sm:text-lg
                      "
                  onClick={onClick}
                  data-next-slug={nextSlug}
                  data-answer-index={index}
          >{answer.text}</Button>
          <br/>
        </div>
  ))}
  </div>
)
}

export default Answers;