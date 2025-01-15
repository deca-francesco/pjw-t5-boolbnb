import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginButton from '../LoginComponents/LoginButton'

export default function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
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

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    // Function to go back to HomePage when the logo is pressed
    const handleHomeClick = (e) => {
        e.preventDefault();  // Previeni il comportamento di navigazione predefinito

        if (isAuthenticated) {
            navigate('/protected', { replace: true });
        } else {
            navigate('/');
        }
    };

    return (

        <header className="bg-dark py-3 px-4 shadow position-sticky top-0 z-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <a className="text-decoration-none" href="/protected" onClick={handleHomeClick}><h1 className="text-white">BoolB&B</h1></a>
                </div>

                <nav className="nav">
                    <ul className="d-flex list-unstyled m-0">

                        {isAuthenticated ? (
                            <>
                                {/* Link per l'aggiunta dell'appartamento */}
                                <li className="mx-3">
                                    <a href="/new-apartment" className="btn btn-light text-dark text-decoration-none">Aggiungi Appartamento</a>
                                </li>
                                {/* Link per il logout */}
                                <li className="mx-3">
                                    <button onClick={handleLogout} className="btn btn-light text-dark text-decoration-none">Logout</button>
                                </li>
                            </>
                        ) : (

                            <LoginButton setIsAuthenticated={setIsAuthenticated} />

                        )}
                    </ul>
                </nav>
            </div>
        </header>

    )
}