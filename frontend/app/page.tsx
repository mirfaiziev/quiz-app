import { getStartUrl } from "@/lib/url"

export default function Home() {
  // todo: init local storage
  // todo: redirect to active quiz
  return (
    <section>
      <a href={`/${getStartUrl()}`}>Go</a>
    </section>
  )
}
