import { useState } from "react"
import { TopicSelectionMenu } from "./components/Topic"
import { Game } from "./components/Game"

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

  const topics = ["Gaming", "Science", "Programming", "Sports", "Technology"]

  return (
    <>
      <header className="flex justify-center items-center h-20 bg-blue-100">
          <div className="columns-1">
            <h1 className="text-2xl font-bold text-center">Video Guessr</h1>
            <div className="ml-2 mr-2">Guess which videos has more views by looking only at their thumbnails.</div>
          </div>
      </header>
      {!startGame && 
      <div className="flex flex-col items-center">
        <TopicSelectionMenu 
          topics={topics} 
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        <div>
          <StartBtn disabled={selectedTopic === ''} handler={() => setStartGame(true)} />
        </div>
      </div>
      }


      {startGame && (
        <Game />
      )}
    </>
  )
}

export default App
