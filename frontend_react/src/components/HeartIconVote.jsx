export default function HeartIconVote({ data_apartment_id, setApartments }) {

    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER
    const url = `${base_api_url}/apartments/vote/${data_apartment_id}`

    const handleHeartClick = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(url)
            console.log(url);

            if (response.ok) {
                const data = await response.json()
                console.log("Fetch successful: ", data.data)
                setApartments(data.data)
            } else {
                console.error("Error fetching data: ", response.statusText)
            }
        } catch (error) { console.error("Error fetching data: ", error); }
    }

    return (
        <>
            <i className="bi bi-heart" onClick={handleHeartClick}></i>
        </>
    )
}