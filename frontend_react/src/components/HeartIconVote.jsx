export default function HeartIconVote({ data_apartment, setApartments }) {

    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER
    const url = `${base_api_url}/apartments/vote/${data_apartment.id}`

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
            <div className='d-flex align-items-center justify-content-end'>
                <i className="bi bi-heart" onClick={handleHeartClick}></i>
                <span className='ms-1'>{data_apartment.vote}</span>
            </div>
        </>
    )
}