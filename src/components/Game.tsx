import { useState } from "react"
import { Video } from "../App"

export const Game = ({videos}:{videos: Array<Video>}) => {
  
  console.log(videos)
  const [points, setPoints] = useState(0)
  
  const [currentQuestionNb, setCurrentQuestionNb] = useState(1)

  return (
      <div className="flex flex-col items-center">
        <h2>{currentQuestionNb}/20</h2>
      </div>
  )
}