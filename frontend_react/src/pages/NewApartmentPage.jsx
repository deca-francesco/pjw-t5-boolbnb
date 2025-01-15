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
            return "The image field must contain a valid URL.";
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
            if (!response.ok) {
                const data = await response.json()
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
            setErrorMessage(error.message)
            console.error("Error adding apartment:", error)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label> Nome appartamento: <input type="text" name="title" value={formData.title} onChange={handleChange} required /> </label>
            <label> Stanze: <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} required /> </label>
            <label> Letti: <input type="number" name="beds" value={formData.beds} onChange={handleChange} required /> </label>
            <label> Bagni: <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required /> </label>
            <label> Metri Quadri: <input type="number" name="square_meters" value={formData.square_meters} onChange={handleChange} required /> </label>
            <label> Indirizzo: <input type="text" name="address" value={formData.address} onChange={handleChange} required /> </label>
            <label> URL immagine: <input type="text" name="image" value={formData.image} onChange={handleChange} required /></label>
            <fieldset>
                <legend>Servizi</legend>
                <label>Wi-Fi gratuito
                    <input
                        type="checkbox"
                        name="services"
                        value={1}
                        checked={formData.services.includes(1)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Parcheggio privato
                    <input
                        type="checkbox"
                        name="services"
                        value={2}
                        checked={formData.services.includes(2)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Piscina
                    <input
                        type="checkbox"
                        name="services"
                        value={3}
                        checked={formData.services.includes(3)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Aria condizionata
                    <input
                        type="checkbox"
                        name="services"
                        value={4}
                        checked={formData.services.includes(4)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Lavatrice
                    <input
                        type="checkbox"
                        name="services"
                        value={5}
                        checked={formData.services.includes(5)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Colazione inclusa
                    <input
                        type="checkbox"
                        name="services"
                        value={6}
                        checked={formData.services.includes(6)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Palestra
                    <input
                        type="checkbox"
                        name="services"
                        value={7}
                        checked={formData.services.includes(7)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Animali ammessi
                    <input
                        type="checkbox"
                        name="services"
                        value={8}
                        checked={formData.services.includes(8)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Terrazza panoramica
                    <input
                        type="checkbox"
                        name="services"
                        value={9}
                        checked={formData.services.includes(9)}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>TV via cavo
                    <input
                        type="checkbox"
                        name="services"
                        value={10}
                        checked={formData.services.includes(10)}
                        onChange={handleServiceChange}
                    />
                </label>
            </fieldset>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <button type="submit">Salva nuovo appartamento</button>
        </form>
    )
}