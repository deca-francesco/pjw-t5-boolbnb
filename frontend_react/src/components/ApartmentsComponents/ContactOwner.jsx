import { useState } from "react";

export default function ContactOwner({ apartment_id }) { // Ricevi l'ID dell'appartamento come prop
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Stato per indicare che il modulo è in invio

    const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER;
    const url = `${base_api_url}/contact/${apartment_id}`; // Aggiungi l'ID dell'appartamento nell'URL

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
        setFormSubmitted(false);
        setError('');
        setName('');
        setEmail('');
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validazione dei campi
        if (!name.trim() || !email.trim() || !message.trim()) {
            setError("Tutti i campi contrassegnati con * sono obbligatori.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Inserisci un'email valida.");
            return;
        }

        setError('');
        setLoading(true);

        // Invio dei dati al backend
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }), // Invia i dati al backend
            });

            const data = await response.json();

            if (response.ok) {
                setFormSubmitted(true);
            } else {
                setError(data.message || "Errore nell'invio del messaggio.");
            }
        } catch (err) {
            setError("Errore di rete. Riprova più tardi.");
        } finally {
            setLoading(false);
        }
    };

    // Funzione per validare l'email
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div>
            <button className="btn btn-dark" onClick={handleButtonClick}>
                {isFormVisible ? "Chiudi il modulo" : "Contatta il proprietario"}
            </button>

            {isFormVisible && (
                <div className="card p-3 mt-4">
                    {!formSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Nome <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Inserisci il tuo nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Inserisci la tua email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Messaggio <span className="text-danger">*</span>
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows="5"
                                    placeholder="Scrivi il tuo messaggio"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={loading} // Disabilita il pulsante durante il caricamento
                            >
                                {loading ? "Invio in corso..." : "Invia"}
                            </button>
                        </form>
                    ) : (
                        <div className="alert alert-success" role="alert">
                            Messaggio inviato al proprietario!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
