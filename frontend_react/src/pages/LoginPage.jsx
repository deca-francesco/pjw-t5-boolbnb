import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginComponents/LoginForm";

const base_api_url = import.meta.env.VITE_EXPRESS_API_SERVER

export default function LoginPage() {

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

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [showPassword, setShowPassword] = useState(false); // Stato per gestire la visibilità della password

    // State fo show the message error
    const [errorMessage, setErrorMessage] = useState("");

    // Hook for redirection 
    const navigate = useNavigate()

    // If the token is found in the localStorage it means that the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    // Handle the data's changes in the form
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Alterna la visibilità della password
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

                    // Update the authentication state
                    setIsAuthenticated(true)

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
        <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} errorMessage={errorMessage} showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
    );
}
