import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginComponents/LoginForm";

const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER;

export default function LoginPage() {

    // State for form data
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
        confirm_password: ""
    });

    // State to handle what form is showing
    const [isLogin, setIsLogin] = useState(true);

    // State to handle if the user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // State to handle the function show password
    const [showPassword, setShowPassword] = useState(false);

    // State to handle the function show the confirm password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State for message display
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    // Hook for redirection
    const navigate = useNavigate();

    // If the token is found in the localStorage it means the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Handle the data's changes in the form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function for show password on button toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function for show the confirm password on button toggle
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Validate the email format
    const validateEmail = (email) => {
        return email.length >= 3 && email.includes('@') && email.includes('.');
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation for required fields
        if (isLogin) {

            // Validation for login (email and password only)
            if (!formData.email.trim() || !formData.password.trim()) {
                setMessage("Compila tutti i campi correttamente.");
                setMessageType('error');
                return;
            }
        } else {

            // Validation for registration fields
            if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirm_password.trim()) {
                setMessage("Compila tutti i campi obbligatori.");
                setMessageType('error');
                return;
            }

            // Validate name
            if (formData.name.trim().length < 3) {
                setMessage("Il nome deve contenere almeno 3 caratteri.");
                setMessageType('error');
                return;
            }

            // Validate last_name
            if (formData.last_name.trim().length < 3) {
                setMessage("Il cognome deve contenere almeno 3 caratteri.");
                setMessageType('error');
                return;
            }

            // Validate email
            if (!validateEmail(formData.email)) {
                setMessage("Inserisci un'email valida (almeno 3 caratteri, '@' e '.').");
                setMessageType('error');
                return;
            }

            // Validate password
            if (formData.password.trim().length < 8) {
                setMessage("La password deve contenere almeno 8 caratteri.");
                setMessageType('error');
                return;
            }

            // Validate password confirmation
            if (formData.password !== formData.confirm_password) {
                setMessage("Le password non corrispondono.");
                setMessageType('error');
                return;
            }
        }

        let endpoint;
        let method;
        let body = null;

        // Determine endpoint and method based on form type (login or registration)
        if (isLogin) {
            endpoint = base_api_url + '/owners/login';
            method = "GET";

            // Add data as query parameters
            const queryParams = new URLSearchParams({
                email: formData.email,
                password: formData.password,
            }).toString();

            endpoint += "?" + queryParams;

        } else {
            endpoint = base_api_url + '/owners/new';
            method = "POST";
            // Removing the password confirm before sending the request to the backend
            const { confirm_password, ...dataToSend } = formData;
            body = JSON.stringify(dataToSend);
        }

        // Fetch request to backend
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
                        // If the response has an error, throw an error with specific backend message
                        const errorMessage = data.error || { general: data.message };
                        throw new Error(JSON.stringify(errorMessage)); // Lancia un errore specifico
                    });
                }
                return response.json();
            })
            .then((data) => {


                if (data.token) {
                    // If there is a token, the owner is authenticated
                    localStorage.setItem("authToken", data.token);
                    setIsAuthenticated(true);
                    setMessage(isLogin ? "Login effettuato con successo" : "Registrazione completata con successo");
                    setMessageType('success');

                    if (!isLogin) {
                        setIsLogin(true);
                        setFormData({
                            name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            phone_number: "",
                            confirm_password: ""
                        });

                        alert('Registrazione completata con successo')
                        navigate('/protected');

                    } else {
                        alert('Login effettuato con successo')
                        const ownerId = data.utente.id;
                        navigate(`/owners/${ownerId}`);
                    }
                } else {
                    // In case of an errore, we handle the message given by the backend
                    if (data.error && data.error.general) {
                        setMessage(data.error.general);
                        setMessageType('error');

                    } else if (data.message) {
                        setMessage(data.message);
                        setMessageType('error');
                    }
                }
            })
            .catch((error) => {

                // Check if the error message contains a 'general' key
                if (error.message && error.message.includes('general')) {

                    // Parse the error details from the error message
                    const errorDetails = JSON.parse(error.message);

                    // Display the general error message if present, otherwise a fallback message
                    setMessage(errorDetails.general || "An error occurred. Please try again later.");

                } else {

                    // If the error doesn't contain a 'general' key, show a generic error message
                    setMessage("An error occurred. Please try again later.");
                }

                // Set the message type to 'error' to display it with an error style
                setMessageType('error');

                // Log the error for debugging purposes
                console.error("Error:", error);
            });

    };

    return (
        <LoginForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            message={message}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
            togglePasswordVisibility={togglePasswordVisibility}
        />
    );
}
