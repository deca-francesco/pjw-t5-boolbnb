export default function HeartIconVote({ data_apartment, setApartments, setApartment }) {
    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER;
    const url = `${base_api_url}/apartments/vote/${data_apartment.id}`;

    const handleHeartClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(url);
            // console.log(url);

            if (response.ok) {
                const data = await response.json(); // La risposta con entrambi i dati
                // console.log("Fetch successful: ", data);

                // Se siamo nella homepage, aggiorniamo la lista degli appartamenti
                if (setApartments) {
                    setApartments(data.data);
                    console.log("SetApartments", data);

                }

                // Se siamo nella pagina di dettaglio, aggiorniamo solo il singolo appartamento
                if (setApartment) {
                    const singleApartment = data.data.find(apartment => apartment.id === data_apartment.id)
                    setApartment({
                        data: singleApartment
                    })
                    console.log("SetApartment", singleApartment);

                }
            } else {
                console.error("Error fetching data: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    return (
        <>
            <div className='d-flex align-items-center justify-content-end p-2'>
                <i className="bi bi-heart" onClick={handleHeartClick}></i>
                <span className='ms-1'>{data_apartment.vote}</span>
            </div>
        </>
    );
}
