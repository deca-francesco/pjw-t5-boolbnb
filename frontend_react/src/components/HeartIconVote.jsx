// import { useState } from 'react'

export default function HeartIconVote() {

    // const [loading, setLoading] = useState(false)
    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER

    const handleHeartClick = async (e) => {
        e.preventDefault()
        const cardId = e.target.getAttribute("data-card-id")
        // setLoading(true)
        try {
            const response = await fetch(`${base_api_url}/vote/${cardId}`,)
            const data = await response.json()
            console.log("Fetch successful: ", data)
        } catch (error) { console.error("Error fetching data: ", error); }
        // setLoading(false)
    }

    return (
        <>
            <button><i class="bi bi-heart" onClick={handleHeartClick}></i></button>
        </>
    )
}