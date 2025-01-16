import { useState } from "react";

export default function ContactOwner() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
        setFormSubmitted(false);
        setError('');
        setName('');
        setEmail('');
        setMessage('');
    };

    const handleSubmit = (e) => {
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
        setFormSubmitted(true);
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

                            <button type="submit" className="btn btn-success">
                                Invia
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



