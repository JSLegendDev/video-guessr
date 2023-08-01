import { useEffect, useState } from "react"
import { TopicSelectionMenu } from "./Components"
import { Game } from "./Game"
import { fetchVideos } from "./utils"
import { topicQueries, topics } from "./topics"
import { Video } from "./types"

function App() {

  const [startGame, setStartGame] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedTopicQuery, setSelectedTopicQuery] = useState('')
  const [videos, setVideos] = useState<Array<Video>>([])

  function clearGame() {
    setStartGame(false)
    setSelectedTopic('')
    setSelectedTopicQuery('')
    setVideos([])
  }



  useEffect(() => {

    function loadCallback() {
      if (window.location.pathname.includes('game')) {
        window.location.pathname = ''
      }
    }

    function popstateCallback() {
      if (!window.location.pathname.includes('game')) {
        clearGame()
      }
    }

    window.addEventListener('load', loadCallback)
  
    window.addEventListener('popstate', popstateCallback)

    return () => {
      window.removeEventListener('load', loadCallback)
      window.removeEventListener('popstate', popstateCallback)
    }
  }, [])

  useEffect(() => {
    if (startGame && !window.location.href.includes('game')) {
      window.history.pushState('game', 'Video Guessr', window.location.href + 'game')
    }

    if (selectedTopic === '') return
    fetchVideos(selectedTopicQuery, setVideos)
  }, [startGame, selectedTopic, selectedTopicQuery])

  return (
    <>
      <header className="flex flex-col bg-blue-100 py-2">
          <h1 className="text-2xl font-bold italic text-center text-slate-700">Video Guessr</h1>
          <p className="mx-2 text-center text-slate-700">
            Guess which videos has more views by looking only at the thumbnail + title.
          </p>
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
              }}
            >
              Start
            </button>
          </>
        }
        {startGame && videos.length === 0 && (
          <span>Loading...</span>
        )}
        {startGame && videos.length !== 0 && (
          <Game 
            videos={videos}
            endGameCallBack={clearGame}
            totalNumberOfQuestions={10} 
          />
        )}

        <h2 className="my-2 text-slate-700">Learn how to build this game by watching <a href="https://www.youtube.com/watch?v=5UHM-4Ub7F4" target="_blank" className="text-blue-600 dark:text-blue-500 hover:underline">this tutorial</a>.</h2>
      </div>
    </>
  )
}

export default App
