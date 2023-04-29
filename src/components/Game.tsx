import { useState, useEffect } from "react"
import { Video } from "../App"

const VideoContainer = ({
  video, 
  onClick,
  selected,
  displayViews,
  isMostPopular
}: {
  video: Video,
  onClick: () => void,
  selected: boolean,
  displayViews: boolean
  isMostPopular: boolean
}) => {
  return (
    <div className={`
      p-2 
      text-center 
      w-96 
      rounded-md 
      ${selected && !displayViews ? "bg-blue-200" : null}
      ${displayViews && isMostPopular ? "bg-green-200" : null}
      ${displayViews && !isMostPopular ? "bg-red-200" : null}
      `}>
      <img className="rounded-md border border-gray-100 shadow-sm" src={video.thumbnailUrl} />
      <p className="truncate">{video.title}</p>
      { displayViews ? <p>{video.views.toLocaleString()} views</p> :
          <button 
            className={`
              bg-blue-500
              ${!selected ? "hover:bg-blue-700" : null} 
              text-white 
              rounded-full 
              py-1 
              px-4 
              m-2
              disabled:cursor-not-allowed
              disabled:opacity-50
            `}
            onClick={onClick}
            disabled={selected}
          >Select</button>
      }
    </div>
  )
}

export const Game = ({videos}:{videos: Array<Video>}) => {
  
  const [points, setPoints] = useState(0)
  const [currentQuestionNb, setCurrentQuestionNb] = useState(1)
  const [firstVideo, setFirstVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })
  const [secondVideo, setSecondVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })
  const [selectedVideo, setSelectedVideo] = useState<'first' | 'second'>()
  const [mostPopularVideo, setMostPopularVideo] = useState<'first' | 'second' | 'equal'>('equal')
  const [showResults, setShowResults] = useState(false)

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

    if (firstVideo.views > secondVideo.views) setMostPopularVideo('first')
    if (firstVideo.views < secondVideo.views) setMostPopularVideo('second')
  }, [])

  return (
      <>
        <h2 className="text-center">{currentQuestionNb}/20</h2>
        <div className="flex flex-wrap flex-row justify-center">
          <VideoContainer 
            video={firstVideo} 
            onClick={() => setSelectedVideo('first')} 
            selected={selectedVideo === 'first'}
            displayViews={showResults}
            isMostPopular={mostPopularVideo === 'first'} 
          />
          <VideoContainer 
            video={secondVideo} 
            onClick={() => setSelectedVideo('second')}
            selected={selectedVideo === 'second'}
            displayViews={showResults}
            isMostPopular={mostPopularVideo === 'second'} 
          />
        </div>
        {
          selectedVideo && !showResults && 
          <div className="flex flex-wrap flex-col justify-center">
            <p>You selected the {selectedVideo} video. Are you sure?</p>
            <button className="
            bg-red-500
            hover:bg-red-700 
            text-white 
            rounded-full 
            py-1 
            px-4 
            m-2
            "
            onClick={() => {
              if (mostPopularVideo === selectedVideo) setPoints((prevScore) => prevScore++)
              setShowResults(true)
            }}
            >Confirm</button>
          </div>
        }
        {
          showResults &&
          <div className="flex flex-wrap flex-col justify-center">
            <p>{mostPopularVideo === selectedVideo ? 'You were right!' : 'You were wrong!'}</p>
            <button>Next</button>
          </div>
        }
      </>
  )
}