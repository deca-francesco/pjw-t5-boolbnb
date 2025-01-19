import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginButton from '../LoginComponents/LoginButton'
import Searchbar from "./Searchbar"

export default function Header() {

    // State to manage authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // State to store the user's ID
    const [userId, setUserId] = useState(null)

    // Hook for navigation
    const navigate = useNavigate()

    // Check if the token exists in localStorage to determine if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            setIsAuthenticated(true);
            // Decode the token to get the user's ID
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserId(decodedToken.id);
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    // Function to log out the user
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUserId(null);
        navigate('/');
    };

    // Function to go back to the HomePage when the logo is clicked
    const handleHomeClick = (e) => {
        e.preventDefault();

        if (isAuthenticated) {
            // Navigate to the protected page if the user is authenticated
            navigate('/protected', { replace: true });

        } else {
            // Navigate to the home page if the user is not authenticated
            navigate('/');
        }
    };

    return (
        <header className="bg-dark py-3 shadow position-sticky top-0 z-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <a className="text-decoration-none" href="/protected" onClick={handleHomeClick}>
                        <h1 className="text-white">BoolB&B</h1>
                    </a>
                </div>

                <div className="d-flex justify-content-center">
                    <Searchbar />
                </div>

                <nav className="nav">
                    <ul className="d-flex list-unstyled align-items-center m-0">
                        {isAuthenticated ? (
                            <>
                                {/* If authenticated, show the following options */}

                                <li className="mx-2">
                                    <a href="/new-apartment" className="btn btn-light text-dark text-decoration-none">Add Apartment</a>
                                </li>

                                <li className="mx-2">
                                    <button onClick={handleLogout} className="btn btn-light text-dark text-decoration-none">Logout</button>
                                </li>

                                {userId && (
                                    <li className="mx-2">
                                        <a href={`/owners/${userId}`}>
                                            <i className="bi bi-person-circle fs-3 text-white profile-icon" />
                                        </a>
                                    </li>
                                )}
                            </>
                        ) : (
                            // If the user is not authenticated, show the login button
                            <LoginButton setIsAuthenticated={setIsAuthenticated} />
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}
