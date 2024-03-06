'use client'

import { IAnswer } from "@/lib/interfaces"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface AnswersProps {
  answers: Array<IAnswer>,
  nextSlug: string
}



const Answers = ({answers, nextSlug}: AnswersProps) => {
  const router = useRouter();

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    router.push(event.currentTarget.dataset.nextSlug || '/')
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
          >{answer.text}</Button>
          <br/>
        </div>
  ))}
  </div>
)
}

export default Answers;