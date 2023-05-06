import { useState, useEffect } from "react"
import { Video } from "./types"
import { VideoContainer } from "./Components"
import { redButtonStyles } from "./stylesets"

export function Game({
  videos,
  endGameCallBack,
  totalNumberOfQuestions,
}:{
  videos: Array<Video>,
  endGameCallBack: () => void,
  totalNumberOfQuestions: number
}) {
  
  const [points, setPoints] = useState(0)
  const [currentQuestionNb, setCurrentQuestionNb] = useState(1)
  const [firstVideo, setFirstVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })
  const [secondVideo, setSecondVideo] = useState<Video>({ title: "", thumbnailUrl: "", views: 0 })
  const [selectedVideo, setSelectedVideo] = useState<'first' | 'second' | 'none'>('none')
  const [mostPopularVideo, setMostPopularVideo] = useState<'first' | 'second' | 'none'>('none')
  const [showResults, setShowResults] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)

  function selectVideosForQuestion() {
    const firstVideo = videos[Math.floor(Math.random() * videos.length)]
    setFirstVideo(firstVideo)

    let secondVideo = videos[Math.floor(Math.random() * videos.length)]
    //prevent picking the same video twice
    while (secondVideo.title === firstVideo.title) {
      secondVideo = videos[Math.floor(Math.random() * videos.length)]
    }
    setSecondVideo(secondVideo)

    if (firstVideo.views > secondVideo.views) setMostPopularVideo('first')
    if (firstVideo.views < secondVideo.views) setMostPopularVideo('second')
  }

  useEffect(() => selectVideosForQuestion(), [])

  return (
      <>
        { !isGameOver &&
          <>
            <div className="flex flex-wrap justify-center text-slate-700">
              <p className="mr-2 text-center font-bold text-2xl">Points : {points}</p>
              <p className="ml-2 font-bold text-2xl">Question No : {currentQuestionNb}/{totalNumberOfQuestions}</p>
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
            <button className={redButtonStyles}
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
            className={redButtonStyles}
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
            <p className="text-center text-3xl font-bold m-8 text-slate-700">Game is over!</p>
            <p className="text-center text-2xl font-bold italic m-8 text-slate-700">
              Your grade : {points}/{totalNumberOfQuestions} ({Math.round(points/totalNumberOfQuestions * 100)}%)
            </p>
            <button className={redButtonStyles}
            onClick={endGameCallBack}
            >Play again</button>
          </div>
        }

        <span className="font-medium italic p-8 text-slate-700">
          Note : If the thumbnail for a video doesn't load. Click on the placeholder image to reload.
        </span>
      </>
  )
}