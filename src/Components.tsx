import { useState, useEffect } from "react"
import { Video } from "./types"

export function VideoContainer({
    video, 
    onClick,
    selected,
    displayViews,
    isMostPopular
}:{
    video: Video,
    onClick: () => void,
    selected: boolean,
    displayViews: boolean
    isMostPopular: boolean
}) {

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
        ${selected && !displayViews ? "bg-blue-200 drop-shadow-md" : null}
        ${displayViews && isMostPopular ? "bg-green-200 drop-shadow-md" : null}
        ${displayViews && !isMostPopular ? "bg-red-200 drop-shadow-md" : null}
        `}
        >
        <img 
            className="border rounded" 
            onClick={() => setDisplayLowresImg(true)}
            src={
                displayLowresImg ? video.thumbnailUrl + "/mqdefault.jpg" : video.thumbnailUrl + "/maxresdefault.jpg"
            }
        />
        <p className="flex-1 mb-1 font-semibold text-left text-slate-700">{video.title}</p>
        { displayViews ? <p className={`font-bold text-left ${isMostPopular ? "text-2xl" : null} text-slate-700`}>{video.views.toLocaleString()} views</p> :
            <button 
                className={`
                bg-blue-500
                ${!selected ? "hover:bg-blue-700" : null} 
                text-white 
                rounded-md 
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

export function TopicSelectionMenu({
    topics,
    selectedTopic, 
    selectTopicAndQuery,
}: {
    topics: Array<string>,
    selectedTopic: string,
    selectTopicAndQuery: (topic : string) => void,
}) {
    return (
        <>
            <div>
                <h2 className="text-center text-slate-700">Choose a topic</h2>
                <div className="flex flex-wrap flex-row justify-center">
                    {topics.map((topic, index) => {
                        return <button
                        key={index}
                        onClick={() => selectTopicAndQuery(topic)} 
                        className="
                        bg-blue-500
                        hover:bg-blue-700 
                        text-white 
                        rounded-full 
                        py-1 
                        px-4 
                        m-1
                        text-center">
                            {topic}
                        </button>
                    })}
                </div>
            </div>
            <div>
            <span className="text-slate-700">
                {selectedTopic === '' ? 'Select a topic to proceed' : `You have selected the topic (${selectedTopic})`}
            </span>
            </div>
        </>
    )
}