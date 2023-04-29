// Here we store a list of instances for the invidious API
// we can use as to avoid rate limiting.
export function getRandomInstance() {
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