import { useState } from "react";

export default function ContactOwner() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleButtonClick = () => {
        setIsFormVisible(!isFormVisible);
        setFormSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    return (
        <div className="container mt-2">
            <button className="btn btn-primary" onClick={handleButtonClick}>
                {isFormVisible ? "Chiudi il modulo" : "Contatta il proprietario"}
            </button>

            {isFormVisible && (
                <div className="mt-4">
                    {!formSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Inserisci il tuo nome"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Inserisci la tua email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Messaggio
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows="5"
                                    placeholder="Scrivi il tuo messaggio"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-success">
                                Invia
                            </button>
                        </form>
                    ) : (
                        <div className="alert alert-success" role="alert">
                            Messaggio inviato con successo! Ti risponderemo il prima possibile.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
