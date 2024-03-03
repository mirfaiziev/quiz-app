import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <h1 className="quiz-question">Question</h1>
      <div>
          <Button
                  type="submit"
                  className="rounded
                      w-full sm:w-1/2
                      p-6 py-3 my-2 h-24
                      bg-slate-100
                      hover:border-2 hover:border-indigo-500 hover:bg-slate-100
                      text-md sm:text-lg
                      "
        
          >Answer</Button>
          <br/>
      </div>
    </section>
  );
}
