import { NextResponse } from "next/server"

async function POST(
  request: Request
) {
  const data = await request.json()
  let valuesCount = {} as any // todo

  for(const answerId in data) {
    if (data[answerId] in valuesCount) {
      valuesCount[data[answerId]] = valuesCount[data[answerId]] + 1
    } else {
      valuesCount[data[answerId]] = 1
    }
  }

  let maxCountValue = null
  let maxCount = 0
  for (const value in valuesCount) {
    if (maxCount < valuesCount[value]) {
      maxCount = valuesCount[value]
      maxCountValue = value
    }
  }

  return NextResponse.json({type:maxCountValue})
}

export {POST}