

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