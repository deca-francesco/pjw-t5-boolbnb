import { useState } from "react"


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

        setFormData((prevFormData) => {
            if (checked) {
                // Aggiungi il servizio selezionato
                return {
                    ...prevFormData,
                    services: [...prevFormData.services, value],
                };
            } else {
                // Rimuovi il servizio deselezionato
                return {
                    ...prevFormData,
                    services: prevFormData.services.filter((service) => service !== value),
                };
            }
        });
    };

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

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formData),
            })
            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || data.message)
            }

            const result = await response.json()
            console.log("Apartment added successfully:", result)

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
                        value="Wi-Fi gratuito"
                        checked={formData.services.includes("Wi-Fi gratuito")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Parcheggio privato
                    <input
                        type="checkbox"
                        name="services"
                        value="Parcheggio privato"
                        checked={formData.services.includes("Parcheggio privato")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Piscina
                    <input
                        type="checkbox"
                        name="services"
                        value="Piscina"
                        checked={formData.services.includes("Piscina")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Aria condizionata
                    <input
                        type="checkbox"
                        name="services"
                        value="Aria condizionata"
                        checked={formData.services.includes("Aria condizionata")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Lavatrice
                    <input
                        type="checkbox"
                        name="services"
                        value="Lavatrice"
                        checked={formData.services.includes("Lavatrice")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Colazione inclusa
                    <input
                        type="checkbox"
                        name="services"
                        value="Colazione inclusa"
                        checked={formData.services.includes("Colazione inclusa")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Palestra
                    <input
                        type="checkbox"
                        name="services"
                        value="Palestra"
                        checked={formData.services.includes("Palestra")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Animali ammessi
                    <input
                        type="checkbox"
                        name="services"
                        value="Animali ammessi"
                        checked={formData.services.includes("Animali ammessi")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>Terrazza panoramica
                    <input
                        type="checkbox"
                        name="services"
                        value="Terrazza panoramica"
                        checked={formData.services.includes("Terrazza panoramica")}
                        onChange={handleServiceChange}
                    />
                </label>
                <label>TV via cavo
                    <input
                        type="checkbox"
                        name="services"
                        value="TV via cavo"
                        checked={formData.services.includes("TV via cavo")}
                        onChange={handleServiceChange}
                    />
                </label>
            </fieldset>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <button type="submit">Salva nuovo appartamento</button>
        </form>
    )
}