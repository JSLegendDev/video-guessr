
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
        m-1
        text-center">
            {name}
        </button>
    )
}

export const TopicSelectionMenu = ({
        topics,
        selectedTopic, 
        selectTopicAndQuery,
    }: {
        topics: Array<string>,
        selectedTopic: string,
        selectTopicAndQuery: (topic : string) => void,
    }) => {
    return (
        <>
            <div>
                <h2 className="text-center">Choose a topic</h2>
                <div className="flex flex-wrap flex-row justify-center">
                    {topics.map((topic, index) => {
                    return <TopicBtn key={index} name={topic} handler={() => {
                        selectTopicAndQuery(topic)
                    }} />
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