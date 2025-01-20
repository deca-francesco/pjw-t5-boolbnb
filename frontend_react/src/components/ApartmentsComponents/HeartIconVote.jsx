export default function HeartIconVote({ data_apartment, setApartments, setFilteredApartments, setApartment }) {
    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER;

    // Ottieni il token e decodificalo in modo sicuro
    const token = localStorage.getItem("authToken");
    let decodedToken;
    try {
        decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
    } catch (error) {
        console.error("Errore nella decodifica del token:", error);
        decodedToken = null;
    }

    // Verifica se l'utente loggato è il proprietario dell'appartamento
    const isOwner = decodedToken && decodedToken.id === data_apartment?.owner_id;

    const handleHeartClick = async (e) => {
        e.preventDefault();

        if (isOwner) {
            console.log("L'utente è il proprietario: il cuore non è cliccabile.");
            return
        }

        if (!data_apartment || !data_apartment.id) {
            console.error("ID appartamento non valido o mancante.");
            return;
        }

        const voteUrl = `${base_api_url}/apartments/vote/${data_apartment.id}`;

        try {
            // Incrementa il voto via API
            const voteResponse = await fetch(voteUrl, { method: 'POST' });
            if (!voteResponse.ok) {
                console.error("Errore durante l'aggiornamento del voto:", voteResponse.statusText);
                return;
            }

            console.log("Voto aggiornato con successo");

            // Se siamo nella homepage
            if (setApartments && !setApartment && !setFilteredApartments) {
                const indexUrl = `${base_api_url}/apartments`;
                const indexResponse = await fetch(indexUrl);
                if (indexResponse.ok) {
                    const data = await indexResponse.json();
                    setApartments(data.data);
                    console.log("SetApartments aggiornato:", data.data);
                } else {
                    console.error("Errore durante il recupero degli appartamenti:", indexResponse.statusText);
                }
            }

            // Se siamo nella pagina di dettaglio
            if (setApartment && !setApartments && setFilteredApartments === undefined) {
                const formattedTitle = data_apartment.title.replace(/\s+/g, '-');
                const showUrl = `${base_api_url}/apartments/${data_apartment.id}/${formattedTitle}`;
                const showResponse = await fetch(showUrl);
                if (showResponse.ok) {
                    const data = await showResponse.json();
                    setApartment && setApartment(data.data);
                    console.log("SetApartment aggiornato:", data.data);
                } else {
                    console.error("Errore durante il recupero del dettaglio dell'appartamento:", showResponse.statusText);
                }
            }

            // Se siamo nella pagina di ricerca avanzata
            if (setApartments && setFilteredApartments) {
                setApartments((prevApartments) =>
                    prevApartments.map((apartment) =>
                        apartment.id === data_apartment.id
                            ? { ...apartment, vote: (apartment.vote || 0) + 1 }
                            : apartment
                    )
                );

                setFilteredApartments((prevFiltered) =>
                    prevFiltered.map((apartment) =>
                        apartment.id === data_apartment.id
                            ? { ...apartment, vote: (apartment.vote || 0) + 1 }
                            : apartment
                    )
                );

                console.log("SetApartments e SetFilteredApartments aggiornati.");
            }
        } catch (error) {
            console.error("Errore durante le chiamate API:", error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-end p-2">
            <i
                className={`bi bi-heart ${isOwner ? 'text-muted' : ''}`}
                style={isOwner ? { cursor: 'not-allowed' } : { cursor: "pointer" }}
                onClick={isOwner ? undefined : handleHeartClick}
            ></i>
            <span className="ms-1">{data_apartment?.vote || 0}</span>
        </div>
    );
}
