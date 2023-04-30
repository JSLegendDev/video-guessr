import { useEffect, useState } from "react"
import { TopicSelectionMenu } from "./components/Topic"
import { Game } from "./components/Game"
import { getRandomInstance } from "./instances"

export interface Video {
  title: string
  thumbnailUrl: string
  views: number
}

const StartBtn = ({disabled, handler}:{disabled: boolean, handler: () => void}) => {
  return (
    <button
      className="
      bg-red-500
      hover:bg-red-700 
      text-white 
      rounded-full 
      py-1 
      px-4 
      m-2
      text-center
      disabled:cursor-not-allowed
      disabled:opacity-50
      "
      disabled={disabled}
      onClick={handler}
    >
      Start
    </button>
  )
}

const App = () => {

  const [startGame, setStartGame] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [videos, setVideos] = useState<Array<Video>>([])

  useEffect(() => {
    if (selectedTopic === '') return
    const fetchVideos = async () => {
      
      let videos = []
      let currentPage = 1

      while(videos.length < 40) {
        
        try {
          const instance = getRandomInstance()
          const response = await fetch(`${instance}/api/v1/search?q=${selectedTopic}&type=video&sort_by=rating&page=${currentPage}`)
          const results = await response.json()

          for (const result of results) {
            videos.push({
              title: result.title,
              thumbnailUrl: `https://i.ytimg.com/vi/${result.videoId}/mqdefault.jpg`,
              views: result.viewCount
            })
          }

          currentPage++
        } catch {} // there is no need to catch in case an instance doesn't work
      }

      setVideos(videos)
    }
    
    fetchVideos()
  }, [startGame])

  const topics = [
    "Gaming", "Programming", "Video Games", "Game Development",
  ]

  return (
    <>
      <header className="flex justify-center items-center h-20 bg-blue-100">
          <div className="columns-1">
            <h1 className="text-2xl font-bold text-center">Video Guessr</h1>
            <div className="ml-2 mr-2 text-center">Guess which videos has more views by looking only at the thumbnail + title.</div>
          </div>
      </header>

      <div className="flex flex-col items-center">
        {!startGame && 
          <>
            <TopicSelectionMenu 
              topics={topics} 
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
            <div>
              <StartBtn disabled={selectedTopic === ''} handler={() => setStartGame(true)} />
            </div>
          </>
        }
        {startGame && videos.length === 0 && (
          <span>Loading...</span>
        )}
        {startGame && videos.length !== 0 && (
          <Game videos={videos} />
        )}
    </div>
    </>
  )
}

export default App
