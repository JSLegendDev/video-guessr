import { Video } from "./types"


// Here we store a list of instances for the invidious API
// we can use as to avoid rate limiting.
function getRandomInstance() {
    const INSTANCES = [
        "https://vid.puffyan.us",
        "https://inv.riverside.rocks",
        "https://y.com.sb",
        "https://invidious.nerdvpn.de",
        "https://invidious.tiekoetter.com",
        "https://yt.artemislena.eu",
        "https://iv.ggtyler.dev"
    ]

    return INSTANCES[Math.floor(Math.random() * INSTANCES.length)] 
}

export async function fetchVideos(query : string, setVideos: (videos: Array<Video>) => void) {
    
    const videos = []
    let currentPage = 1

    while(videos.length < 30) {
        
        try {
            const instance = getRandomInstance()
            const response = await fetch(`${instance}/api/v1/search?q="${query}"&type=video&sort_by=rating&page=${currentPage}`)
            const results = await response.json()

            for (const result of results) {
                videos.push({
                title: result.title,
                thumbnailUrl: `https://i.ytimg.com/vi/${result.videoId}`,
                views: result.viewCount
                })
            }

            currentPage++
        // eslint-disable-next-line no-empty
        } catch {} // there is no need to catch in case an instance doesn't work, we simply move on the next
    }

    setVideos(videos)
}