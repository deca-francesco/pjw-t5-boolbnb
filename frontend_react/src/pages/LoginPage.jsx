import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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

    // State for error messages (field-specific)
    const [errors, setErrors] = useState({});

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

        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
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

        const newErrors = {}

        // Validation for required fields
        if (isLogin) {
            // Validation for login
            if (!formData.email.trim()) {
                newErrors.email = "L'email è obbligatoria.";
            }
            if (!formData.password.trim()) {
                newErrors.password = "La password è obbligatoria.";
            }
        } else {
            // Validation for registration
            if (!formData.name.trim()) {
                newErrors.name = "Il nome è obbligatorio.";
            } else if (formData.name.trim().length < 3) {
                newErrors.name = "Il nome deve contenere almeno 3 caratteri.";
            }

            if (!formData.last_name.trim()) {
                newErrors.last_name = "Il cognome è obbligatorio.";
            } else if (formData.last_name.trim().length < 3) {
                newErrors.last_name = "Il cognome deve contenere almeno 3 caratteri.";
            }

            if (!validateEmail(formData.email)) {
                newErrors.email = "Inserisci un'email valida.";
            }

            if (formData.password.trim().length < 8) {
                newErrors.password = "La password deve contenere almeno 8 caratteri.";
            }

            if (formData.confirm_password !== formData.password) {
                newErrors.confirm_password = "Le password non corrispondono.";
            }
        }

        // If there are errors, set them and stop submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
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
                        const errorMessage = data.error || data.message || "Errore generico.";
                        console.log(errorMessage);

                        throw new Error(errorMessage);
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                    setIsAuthenticated(true);

                    if (!isLogin) {
                        setIsLogin(true);
                        setFormData({
                            name: "",
                            last_name: "",
                            email: "",
                            password: "",
                            phone_number: "",
                            confirm_password: "",
                        });
                        toast.success("Registrazione completata con successo!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        const ownerId = data.utente.id;
                        setTimeout(() => {
                            navigate(`/owners/${ownerId}`);
                        }, 2000);

                    } else {
                        toast.success("Login effettuato con successo!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        const ownerId = data.utente.id;
                        setTimeout(() => {
                            navigate(`/owners/${ownerId}`);
                        }, 2000);
                    }
                }
            })
            .catch((error) => {
                setErrors({ general: error.message });
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            });


    };

    return (
        <>


            <LoginForm
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                message={errors.general}
                messageType='error'
                fieldErrors={errors}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                togglePasswordVisibility={togglePasswordVisibility}
            />

            <ToastContainer />

        </>
    );
}
