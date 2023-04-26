import { useState } from "react"
import { Video } from "../App"

const VideoContainer = ({video}: {video: Video}) => {
  return (
    <div className="">
      <div className="w-32">
        <img className="object-scale-down h-48 w-96" src={video.thumbnailUrl}/>
        <p>{video.title}</p>
      </div>
      <button>Select</button>
    </div>
  )
}




export const Game = ({videos}:{videos: Array<Video>}) => {
  
  console.log(videos)
  const [points, setPoints] = useState(0)
  
  const [currentQuestionNb, setCurrentQuestionNb] = useState(1)

  return (
      <div>
        <h2 className="text-center">{currentQuestionNb}/20</h2>
        <div className="p-2 text-center">
          <div>
            <img className="rounded-md border border-gray-100 shadow-sm" src={videos[0].thumbnailUrl} />
          </div>
          <p>{videos[0].title}</p>
          <button className="
            bg-blue-500
            hover:bg-blue-700 
            text-white 
            rounded-full 
            py-1 
            px-4 
            m-2
          ">Select</button>
        </div>
      </div>
  )
}