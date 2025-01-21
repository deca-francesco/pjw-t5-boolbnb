
import { useState } from "react";

export default function ReviewFormCard({ apartment_id, setReviews }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [review, setReview] = useState('');
    const [days, setDays] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' o 'error'

    function validateEmail(email) {
        return email.length >= 3 && email.includes('@') && email.includes('.');
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        // Validazione campi obbligatori
        if (!username.trim() || !email.trim() || !review.trim()) {
            setMessage("Compila i campi obbligatori.");
            setMessageType('error');
            return;
        }

        // Validazione username
        if (username.trim().length < 3) {
            setMessage("Il nome deve contenere almeno 3 caratteri.");
            setMessageType('error');
            return;
        }

        // Validazione email
        if (!validateEmail(email)) {
            setMessage("Inserisci un'email valida (almeno 3 caratteri, '@' e '.').");
            setMessageType('error');
            return;
        }

        const formData = { username, email, review, days };

        const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER;
        const review_apartment_api_url = `${base_api_url}/apartments/review/${apartment_id}`;

        fetch(review_apartment_api_url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setMessage("Grazie! La tua recensione è stata inviata");
                    setMessageType('success');

                    const newReview = { username, email, review, days, date: new Date().toLocaleDateString() };

                    // Aggiungi la recensione all'array delle recensioni esistenti
                    setReviews(data.reviews)

                    // Reset dei campi
                    setUsername('');
                    setEmail('');
                    setReview('');
                    setDays('');
                } else {
                    setMessage("Si è verificato un errore. Riprova più tardi.");
                    setMessageType('error');
                }
            })
            .catch(err => {
                setMessage("Errore di connessione. Controlla la tua rete e riprova.");
                setMessageType('error');
            });
    }

    return (
        <>
            <div className="card my-4 bg-white text-dark">
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <p>Nome <span className="text-danger">*</span></p>
                            <input
                                name="username"
                                id="username"
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <p>Email <span className="text-danger">*</span></p>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <p>Scrivi una recensione <span className="text-danger">*</span></p>
                            <textarea
                                className='w-100 form-control'
                                name="review"
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <p>Giorni di permanenza</p>
                            <input
                                name="days"
                                id="days"
                                type="number"
                                className="form-control"
                                placeholder="Numero di giorni"
                                value={days}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value >= 0) setDays(value);
                                }}
                            />
                        </div>

                        <button type="submit" className="btn btn-success mt-2"><strong>Invia</strong></button>
                    </form>

                    {/* Messaggio di conferma o errore */}
                    {message && (
                        <div className={`mt-3 alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}


