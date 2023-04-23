import { useState } from "react"
import { TopicBtn } from "./components/Topic"

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

function App() {

  const [startGame, setStartGame] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState('')

  const topics = ["Gaming", "Science", "Programming", "Sports", "Technology"]

  return (
    <>
      {!startGame &&
      <>
        <header className="flex justify-center items-center h-20 bg-blue-100">
          <div className="columns-1">
            <h1 className="text-2xl font-bold text-center">Video Guessr</h1>
            <div className="ml-2 mr-2">Guess which videos has more views by looking only at their thumbnails.</div>
          </div>
        </header>
        <div className="flex flex-col items-center">
          <div>
            <h2>Choose a topic</h2>
            <div>
              {topics.map(topic => {
                return <TopicBtn name={topic} handler={() => {setSelectedTopic(topic)}} />
              })}
            </div>
          </div>
          <div>
            <span>
              {selectedTopic === '' ? 'Select a topic to proceed' : `You have selected the topic (${selectedTopic})`}
            </span>
          </div>
          <div>
            <StartBtn disabled={selectedTopic === ''} handler={() => setStartGame(true)} />
          </div>
        </div>
      </>
      }
    </>
  )
}

export default App
