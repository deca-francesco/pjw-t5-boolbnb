export default function HeartIconVote({ data_apartment, setApartments, setApartment }) {
    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER;

    const handleHeartClick = async (e) => {
        e.preventDefault();

        // Verifica se l'ID è valido prima di procedere
        if (!data_apartment || !data_apartment.id) {
            console.error("ID appartamento non valido o mancante.");
            return;
        }

        const voteUrl = `${base_api_url}/apartments/vote/${data_apartment.id}`;
        const indexUrl = `${base_api_url}/apartments`; // Rotta per tutti gli appartamenti

        const formattedTitle = data_apartment.title.replace(/\s+/g, '-')
        const showUrl = `${base_api_url}/apartments/${data_apartment.id}/${formattedTitle}`; // Rotta per un singolo appartamento

        try {
            // Chiamata per incrementare il voto
            const voteResponse = await fetch(voteUrl, { method: 'POST' });
            if (!voteResponse.ok) {
                console.error("Errore durante l'aggiornamento del voto:", voteResponse.statusText);
                return;
            }

            console.log("Voto aggiornato con successo");

            // Se siamo nella homepage, aggiorniamo l'elenco degli appartamenti
            if (setApartments) {
                const indexResponse = await fetch(indexUrl); // Chiamata alla rotta index
                if (indexResponse.ok) {
                    const data = await indexResponse.json();
                    setApartments(data.data); // Aggiorna l'elenco
                    console.log("SetApartments aggiornato:", data.data);
                } else {
                    console.error("Errore durante il recupero degli appartamenti:", indexResponse.statusText);
                }
            }

            // Se siamo nella pagina di dettaglio, aggiorniamo il singolo appartamento
            if (setApartment) {
                const showResponse = await fetch(showUrl); // Chiamata alla rotta show
                if (showResponse.ok) {
                    const data = await showResponse.json();
                    setApartment(data); // Aggiorna il dettaglio
                    console.log("SetApartment aggiornato:", data);
                } else {
                    console.error("Errore durante il recupero del dettaglio dell'appartamento:", showResponse.statusText);
                }
            }
        } catch (error) {
            console.error("Errore durante le chiamate API:", error);
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-end p-2'>
            <i className="bi bi-heart" onClick={handleHeartClick}></i>
            <span className='ms-1'>{data_apartment?.vote || 0}</span>
        </div>
    );
}
