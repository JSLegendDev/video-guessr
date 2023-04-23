import { useState } from "react"

export const Game = () => {
    
    const [points, setPoints] = useState(0)
    
    return (
        <div className="flex flex-col items-center">
          <h2>0/20</h2>
        </div>
    )
}