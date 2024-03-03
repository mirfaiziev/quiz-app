import Answers from "@/components/custom/Answers";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const QuestionAnsewer = {
  question: "How important is love and relationships in your life?",
  answers: [
      {text: "Love and relationships are my top priorities! ❤️"},
      {text: "Important, but I also value personal growth 😊"},
      {text: "It varies depending on the situation 🤷‍♀️"},
      {text: "Not a top priority for me 🚫"}
  ]
}

export default function Home() {
  return (
    <section>
      <h1 className="quiz-question">{QuestionAnsewer.question}</h1>
      <Answers answers={QuestionAnsewer.answers}/>
    </section>
  );
}
