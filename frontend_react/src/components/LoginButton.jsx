import { useState } from "react";
import { useNavigate } from "react-router-dom";

const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER

export default function LoginButton() {

    // State for open or close form
    const [showForm, setShowForm] = useState(false);

    // State fo data form
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
    });

    // State to handle what form is showing
    const [isLogin, setIsLogin] = useState(true);

    // State fo show the message error
    const [errorMessage, setErrorMessage] = useState("");

    // Hook for redirection 
    const navigate = useNavigate()

    // Handle the data's changes in the form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form's submit
    const handleSubmit = (e) => {
        e.preventDefault();

        let endpoint;
        let method;
        let body = null;

        // Endpoint and request changing for the type of opeation
        if (isLogin) {
            endpoint = base_api_url + '/owners/login';
            method = "GET";

            // Add datas as query params
            const queryParams = new URLSearchParams({
                email: formData.email,
                password: formData.password,
            }).toString();

            endpoint += "?" + queryParams;

        } else {
            endpoint = base_api_url + '/owners/new';
            method = "POST";
            body = JSON.stringify(formData);
        }

        setErrorMessage('')

        // Fetch call to backend
        fetch(endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: method === "POST" ? body : undefined,
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.error || data.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.token) {
                    // Save the token in localStorage
                    localStorage.setItem("authToken", data.token);
                    alert(isLogin ? "Login effettuato con successo" : "Registrazione completata con successo");

                    // If the registration is ok, you will be redirected to login form
                    if (!isLogin) {
                        setIsLogin(true)

                        // Form reset
                        setFormData({
                            name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            phone_number: "",
                        });

                    } else {
                        navigate('/protected')
                    }

                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setErrorMessage(error.message)
                alert(error.message);
            });
    };

    return (
        <div>
            {/* Button for the form */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Chiudi Form" : "Login / Registrati"}
            </button>

            {/* If the form is opened, show the correct one */}
            {showForm && (
                <div>
                    {/* Login form */}
                    {isLogin ? (
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Accedi</button>
                            <button type="button" onClick={() => setIsLogin(false)}>
                                Non hai un account? Registrati
                            </button>
                        </form>
                    ) : (
                        /* Registration form */
                        <form onSubmit={handleSubmit}>
                            <h2>Registrazione</h2>
                            <div>
                                <label>Nome:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Cognome:</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Numero di telefono:</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Registrati</button>
                            <button type="button" onClick={() => setIsLogin(true)}>
                                Hai già un account? Accedi
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
