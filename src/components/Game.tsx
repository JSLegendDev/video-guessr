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

  const [displayLowresImg, setDisplayLowresImg] = useState(false)

  useEffect(() => setDisplayLowresImg(false), [video])
  
  return (
    <div className={`
      p-2 
      text-center 
      w-96 
      rounded-md
      m-2
      flex
      flex-col
      ${selected && !displayViews ? "bg-blue-200" : null}
      ${displayViews && isMostPopular ? "bg-green-200" : null}
      ${displayViews && !isMostPopular ? "bg-red-200" : null}
      `}
      >
      <img 
        className="rounded-md border border-gray-100 shadow-sm" 
        onClick={() => setDisplayLowresImg(true)}
        src={
          displayLowresImg ? video.thumbnailUrl + "/mqdefault.jpg" : video.thumbnailUrl + "/maxresdefault.jpg"
        } 
      />
      <p className="flex-1">{video.title}</p>
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

export const Game = ({
  videos,
  endGameCallBack,
  totalNumberOfQuestions,
}:{
  videos: Array<Video>,
  endGameCallBack: () => void,
  totalNumberOfQuestions: number
}) => {
  
  const [points, setPoints] = useState(0)
  const [currentQuestionNb, setCurrentQuestionNb] = useState(1)
  const [firstVideo, setFirstVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })
  const [secondVideo, setSecondVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })
  const [selectedVideo, setSelectedVideo] = useState<'first' | 'second' | 'none'>('none')
  const [mostPopularVideo, setMostPopularVideo] = useState<'first' | 'second' | 'none'>('none')
  const [showResults, setShowResults] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  const selectVideosForQuestion = () => {
    const firstVideo = videos[Math.floor(Math.random() * videos.length)]
    setFirstVideo(firstVideo)

    const secondVideo = videos[Math.floor(Math.random() * videos.length)]
    setSecondVideo(secondVideo)

    if (firstVideo.views > secondVideo.views) setMostPopularVideo('first')
    if (firstVideo.views < secondVideo.views) setMostPopularVideo('second')
  }

  useEffect(() => selectVideosForQuestion(), [])

  return (
      <>
        { !isGameOver &&
          <>
            <div className="flex flex-wrap justify-center">
              <p className="mr-2 text-center">Points : {points}</p>
              <p className="ml-2">Question No : {currentQuestionNb}/{totalNumberOfQuestions}</p>
            </div>
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
          </>
        }
        {
          selectedVideo !== 'none' && !showResults && !isGameOver && 
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
                if (mostPopularVideo === selectedVideo) setPoints(points + 1)
                setShowResults(true)
              }}
            >Confirm</button>
          </div>
        }
        {
          showResults && !isGameOver &&
          <div className="flex flex-wrap flex-col justify-center">
            <p>{mostPopularVideo === selectedVideo ? 'You were right!' : 'You were wrong!'}</p>
            <button
            className="
            bg-red-500
            hover:bg-red-700 
            text-white 
            rounded-full 
            py-1 
            px-4 
            m-2
            "
            onClick={() => {
              setShowResults(false)
              if (currentQuestionNb === totalNumberOfQuestions) {
                setIsGameOver(true)
                return
              }

              setCurrentQuestionNb(currentQuestionNb + 1)
              selectVideosForQuestion()
              setSelectedVideo('none')

            }}
            >Next</button>
          </div>
        }

        {
          isGameOver &&
          <div className="flex flex-wrap flex-col justify-center">
            <p className="text-center text-3xl font-bold m-8">Game is over!</p>
            <p className="text-center text-2xl font-bold italic m-8">
              Your grade : {points}/{totalNumberOfQuestions} ({Math.round(points/totalNumberOfQuestions * 100)}%)
            </p>
            <button className="
              bg-red-500
              hover:bg-red-700 
              text-white 
              rounded-full 
              py-1 
              px-4 
              m-8
            "
            onClick={endGameCallBack}
            >Play again</button>
          </div>
        }
      </>
  )
}