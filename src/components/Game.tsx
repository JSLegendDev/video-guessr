import { useState, useEffect } from "react"
import { Video } from "../App"

const VideoContainer = ({video}: {video: Video}) => {
  return (
    <div className="p-2 text-center w-96">
      <img className="rounded-md border border-gray-100 shadow-sm" src={video.thumbnailUrl} />
      <p className="truncate">{video.title}</p>
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
  )
}




export const Game = ({videos}:{videos: Array<Video>}) => {
  
  const [points, setPoints] = useState(0)
  const [currentQuestionNb, setCurrentQuestionNb] = useState(1)
  const [firstVideo, setFirstVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })
  const [secondVideo, setSecondVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })

  useEffect(() => {
    const firstVideo = videos[Math.floor(Math.random() * videos.length)]
    const removeFromVideos = (video: Video) => {
      for (let i = 0; i < videos.length; i++) {
        if (videos[i] === video) {
          videos.splice(i, 1)
        }
      }
    }
    
    removeFromVideos(firstVideo)
    setFirstVideo(firstVideo)

    const secondVideo = videos[Math.floor(Math.random() * videos.length)]
    removeFromVideos(secondVideo)
    setSecondVideo(secondVideo)
  }, [])

  return (
      <>
        <h2 className="text-center">{currentQuestionNb}/20</h2>
        <div className="flex flex-wrap flex-row justify-center">
          <VideoContainer video={firstVideo}/>
          <VideoContainer video={secondVideo}/>
        </div>
      </>
  )
}