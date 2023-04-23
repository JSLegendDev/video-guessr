
export const TopicBtn = ({name, handler}:{name: string, handler: () => void}) => {
    return (
        <button
        onClick={handler} 
        className="
        bg-blue-500
        hover:bg-blue-700 
        text-white 
        rounded-full 
        py-1 
        px-4 
        m-2
        text-center">
            {name}
        </button>
    )
}

export const TopicSelectionMenu = ({
        topics,
        selectedTopic, 
        setSelectedTopic,
    }: {
        topics: Array<string>,
        selectedTopic: string,
        setSelectedTopic: React.Dispatch<React.SetStateAction<string>>,
    }) => {
    return (
        <>
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
        </>
    )
}