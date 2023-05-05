import { useEffect, useState } from "react"
import { TopicSelectionMenu } from "./components2"
import { Game } from "./Game"
import { fetchVideos } from "./utils"
import { topicQueries, topics } from "./topics"
import { Video } from "./types"

const App = () => {

  const [startGame, setStartGame] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedTopicQuery, setSelectedTopicQuery] = useState('')
  const [videos, setVideos] = useState<Array<Video>>([])

  window.addEventListener('load', () => {
    if (window.location.pathname.includes('game')) {
      window.location.pathname = ''
    }
  })

  window.addEventListener('popstate', () => {
    if (!window.location.pathname.includes('game')) {
      setStartGame(false)
      setSelectedTopic('')
      setVideos([])
    }
  })

  useEffect(() => {
    if (startGame && !window.location.href.includes('game')) {
      window.history.pushState('game', 'Video Guessr', window.location.href + 'game')
    }

    if (selectedTopic === '') return
    fetchVideos(selectedTopicQuery, setVideos)
  }, [startGame])

  return (
    <>
      <header className="flex justify-center items-center h-20 bg-blue-100">
          <div className="columns-1">
            <h1 className="text-2xl font-bold italic text-center text-slate-700">Video Guessr</h1>
            <p className="ml-2 mr-2 text-center text-slate-700">
              Guess which videos has more views by looking only at the thumbnail + title.
            </p>
          </div>
      </header>

      <div className="flex flex-col items-center">
        {!startGame && 
          <>
            <TopicSelectionMenu 
              topics={topics} 
              selectedTopic={selectedTopic}
              selectTopicAndQuery={(topic: string) => {
                setSelectedTopic(topic)
                const currentTopicQueries = topicQueries[topic]
                setSelectedTopicQuery(currentTopicQueries[Math.floor(Math.random() * currentTopicQueries.length)])
              }}
            />
            <div>
              <button
                className="
                bg-red-500
                hover:bg-red-700 
                text-white 
                rounded-md 
                py-1 
                px-32 
                m-2
                text-center
                disabled:cursor-not-allowed
                disabled:opacity-50
                "
                disabled={selectedTopic === ''}
                onClick={() => {
                  setStartGame(true)
                  setVideos([])
                }}
              >
                Start
              </button>
            </div>
          </>
        }
        {startGame && videos.length === 0 && (
          <span>Loading...</span>
        )}
        {startGame && videos.length !== 0 && (
          <Game 
            videos={videos}
            endGameCallBack={() => setStartGame(false)}
            totalNumberOfQuestions={10} 
          />
        )}
      </div>
    </>
  )
}

export default App
