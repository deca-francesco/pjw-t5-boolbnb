import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewApartmentPage() {
    // Stato per raccogliere i dati del modulo
    const [formData, setFormData] = useState({
        title: "",
        rooms: "",
        beds: "",
        bathrooms: "",
        square_meters: "",
        address: "",
        city: "",
        services: []
    });

    // Stato per la gestione del file immagine selezionato
    const [selectedFile, setSelectedFile] = useState(null);

    // Stato per gestire i messaggi di successo o errore
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate(); // Hook per la navigazione

    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER;
    const url = `${base_api_url}/apartments/new`;

    // Funzione per gestire i cambiamenti nei campi di input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Funzione per gestire il cambiamento nei checkbox dei servizi
    const handleServiceChange = (e) => {
        const { value, checked } = e.target;
        const serviceId = parseInt(value, 10);

        setFormData((prevFormData) => {
            if (checked) {
                return { ...prevFormData, services: [...prevFormData.services, serviceId] };
            } else {
                return {
                    ...prevFormData,
                    services: prevFormData.services.filter((id) => id !== serviceId),
                };
            }
        });
    };

    // Funzione per gestire la selezione del file immagine
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Funzione di validazione del modulo
    const validateFormData = () => {
        if (!formData.title.trim()) return "Nome appartamento richiesto.";
        if (!formData.rooms || formData.rooms <= 0) return "Stanze deve essere un numero maggiore di 0.";
        if (!formData.beds || formData.beds <= 0) return "Letti deve essere un numero maggiore di 0.";
        if (!formData.bathrooms || formData.bathrooms <= 0) return "Bagni deve essere un numero maggiore di 0.";
        if (!formData.square_meters || formData.square_meters <= 0) return "Metri quadri deve essere un numero maggiore di 0.";
        if (!formData.address.trim()) return "Indirizzo richiesto.";
        if (!formData.city.trim()) return "Città richiesta.";

        // Validazione dell'immagine
        if (!selectedFile) {
            return "Immagine richiesta.";
        }
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validImageTypes.includes(selectedFile.type)) {
            return "Il file deve essere un'immagine JPEG o PNG.";
        }
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
            return "L'immagine non può essere più grande di 5MB.";
        }

        return null;
    };

    // Funzione di invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        console.log('Form Data:', formData);

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            setMessage("Token mancante. Devi essere autenticato.");
            setMessageType("error");
            return;
        }

        const error = validateFormData();
        if (error) {
            setMessage(error);
            setMessageType("error");
            return;
        }

        // Creazione dell'oggetto FormData per inviare il modulo insieme al file
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("rooms", Number(formData.rooms));
        formDataToSend.append("beds", Number(formData.beds));
        formDataToSend.append("bathrooms", Number(formData.bathrooms));
        formDataToSend.append("square_meters", Number(formData.square_meters));
        formDataToSend.append("address", formData.address);
        formDataToSend.append("city", formData.city);
        // formDataToSend.append("services", JSON.stringify(formData.services));
        formDataToSend.append("image", selectedFile);

        // // Aggiungi il file
        // if (selectedFile) {
        //     formDataToSend.append("image", selectedFile);
        // }

        // Aggiungi i servizi (se ci sono)
        formData.services.forEach(serviceId => {
            formDataToSend.append("services[]", serviceId);
        })

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.status === 401 && data.message === "Sessione scaduta! effettua nuovamente l'accesso") {
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || data.message);
            }

            console.log("Apartment added successfully:", data);

            // Alert di conferma
            setMessage("Appartamento creato con successo!");
            setMessageType("success");
            alert("Appartamento creato con successo!");

            // Reindirizza alla pagina dell'appartamento appena creato
            navigate(`/apartments/${data.new_apartment_id}`);

            // Reset del form
            setFormData({
                title: "",
                rooms: "",
                beds: "",
                bathrooms: "",
                square_meters: "",
                address: "",
                city: "",
                image: "",
                services: [],
            });
        } catch (error) {
            console.error("Error adding apartment:", error);
            setMessage(error.message);
            setMessageType("error");
            // alert(error.message);
        }
    }


    return (
        <>
            <div className="container mb-5">
                <h2 className="mt-3">Inserisci i dati del nuovo appartamento</h2>
                <form onSubmit={handleSubmit} className="mt-5 card p-4">
                    <div className="mb-3">
                        <label className="form-label">* Nome appartamento:</label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">* Stanze:</label>
                        <input type="number" min="1" className="form-control" name="rooms" value={formData.rooms} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">* Letti:</label>
                        <input type="number" min="1" className="form-control" name="beds" value={formData.beds} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">* Bagni:</label>
                        <input type="number" min="1" className="form-control" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">* Metri Quadri:</label>
                        <input type="number" min="1" className="form-control" name="square_meters" value={formData.square_meters} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">* Indirizzo:</label>
                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">* Città:</label>
                        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">* Immagine:</label>
                        <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} required />
                    </div>
                    <div className="my-3">
                        I campi con "*" sono obbligatori
                    </div>
                    <fieldset>
                        <legend>Servizi (Opzionali)</legend>
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
                    {/* {errorMessage && <div className="error btn btn-danger disabled my-3">{errorMessage}</div>} */}
                    {message && (
                        <div className={`alert mt-3 ${messageType === "success" ? "alert-success" : "alert-danger"}`}>{message}</div>
                    )}
                    <button type="submit" className="btn btn-primary">Salva nuovo appartamento</button>
                </form>
            </div>
        </>
    )
}