import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NewApartmentPage() {

    const [formData, setFormData] = useState({
        title: "",
        rooms: "",
        beds: "",
        bathrooms: "",
        square_meters: "",
        address: "",
        image: "",
        services: []
    })

    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER
    // da rivedere owner_id
    const url = `${base_api_url}/apartments/new`

    // Handle the data's changes in the form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        // Converti il valore in un numero
        const serviceId = parseInt(value, 10)

        setFormData((prevFormData) => {
            if (checked) {
                // Aggiungi il servizio selezionato
                return {
                    ...prevFormData,
                    services: [...prevFormData.services, serviceId],
                };
            } else {
                // Rimuovi il servizio deselezionato
                return {
                    ...prevFormData,
                    services: prevFormData.services.filter((id) => id !== serviceId),
                };
            }
        });
    }

    // Validazione lato client
    const validateFormData = () => {
        // Controllo campi testuali
        if (!formData.title.trim()) {
            return "Nome appartamento richiesto.";
        }
        if (!formData.address.trim()) {
            return "Indirizzo richiesto.";
        }

        // Controllo campi numerici
        if (!formData.rooms || formData.rooms <= 0) {
            return "Stanze deve essere un numero intero maggiore di 0.";
        }
        if (!formData.beds || formData.beds <= 0) {
            return "Letti deve essere un numero intero maggiore di 0.";
        }
        if (!formData.bathrooms || formData.bathrooms <= 0) {
            return "Bagni deve essere un numero intero maggiore di 0.";
        }
        if (!formData.square_meters || formData.square_meters <= 0) {
            return "Metri quadri deve essere un numero maggiore di 0.";
        }

        // Controllo URL immagine (regex per URL base)
        const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
        if (!urlPattern.test(formData.image)) {
            return "L'immagine deve contenere un URL valido.";
        }

        // Validazione dell'array services
        if (!Array.isArray(formData.services) || formData.services.some(isNaN)) {
            return "I servizi devono essere un array di ID validi.";
        }

        // Se tutti i campi sono validi, non ritorniamo errori
        return null;
    }

    // Handle form's submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        // Validazione lato client
        const error = validateFormData();
        if (error) {
            setErrorMessage(error);
            return;
        }

        const authToken = localStorage.getItem('authToken')
        if (!authToken) {
            setErrorMessage('Token mancante. Devi essere autenticato.')
            return
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.status === 401 && data.message === "Sessione scaduta! effettua nuovamente l'accesso") {
                navigate('/login');
                return;
            }


            if (!response.ok) {
                throw new Error(data.error || data.message)
            }

            const result = await response.json()
            console.log("Apartment added successfully:", result)

            // Alert di conferma
            alert("Appartamento creato con successo!");

            // Reindirizza alla pagina dell'appartamento appena creato
            navigate(`/apartments/${result.new_apartment_id}`)

            // Reset del form
            setFormData({
                title: "",
                rooms: "",
                beds: "",
                bathrooms: "",
                square_meters: "",
                address: "",
                image: "",
                services: [],
            })
        } catch (error) {
            alert(error.message);

            console.error("Error adding apartment:", error)
        }
    }


    return (
        <>
            <div className="container mb-5">
                <h2 className="mt-3">Inserisci i dati del nuovo appartamento</h2>
                <form onSubmit={handleSubmit} className="mt-5 card p-4">
                    <div className="mb-3">
                        <label className="form-label"> Nome appartamento:</label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Stanze:</label>
                        <input type="number" className="form-control" name="rooms" value={formData.rooms} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Letti:</label>
                        <input type="number" className="form-control" name="beds" value={formData.beds} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Bagni:</label>
                        <input type="number" className="form-control" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Metri Quadri:</label>
                        <input type="number" className="form-control" name="square_meters" value={formData.square_meters} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> Indirizzo:</label>
                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"> URL immagine:</label>
                        <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <fieldset>
                        <legend>Servizi</legend>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-5">
                            <div className="col">
                                <input type="checkbox" name="services" value={1} checked={formData.services.includes(1)} onChange={handleServiceChange} className="me-2" />
                                <label>Wi-Fi gratuito</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={2} checked={formData.services.includes(2)} onChange={handleServiceChange} className="me-2" />
                                <label>Parcheggio privato</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={3} checked={formData.services.includes(3)} onChange={handleServiceChange} className="me-2" />
                                <label>Piscina</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={4} checked={formData.services.includes(4)} onChange={handleServiceChange} className="me-2" />
                                <label>Aria condizionata</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={5} checked={formData.services.includes(5)} onChange={handleServiceChange} className="me-2" />
                                <label>Lavatrice</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={6} checked={formData.services.includes(6)} onChange={handleServiceChange} className="me-2" />
                                <label>Colazione inclusa</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={7} checked={formData.services.includes(7)} onChange={handleServiceChange} className="me-2" />
                                <label>Palestra</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={8} checked={formData.services.includes(8)} onChange={handleServiceChange} className="me-2" />
                                <label>Animali ammessi</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={9} checked={formData.services.includes(9)} onChange={handleServiceChange} className="me-2" />
                                <label>Terrazza panoramica</label>
                            </div>

                            <div className="col">
                                <input type="checkbox" name="services" value={10} checked={formData.services.includes(10)} onChange={handleServiceChange} className="me-2" />
                                <label>TV via cavo</label>
                            </div>
                        </div>
                    </fieldset>
                    {errorMessage && <div className="error btn btn-danger disabled my-3">{errorMessage}</div>}
                    <button type="submit" className="btn btn-primary">Salva nuovo appartamento</button>
                </form>
            </div>
        </>
    )
}