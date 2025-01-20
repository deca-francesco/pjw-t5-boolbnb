import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../LoginComponents/LoginButton";
import Searchbar from "./Searchbar";

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                setIsAuthenticated(true);
                setUserId(decodedToken.id);
            } catch (err) {
                console.error("Errore nel decodificare il token:", err);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUserId(null);
        navigate("/");
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate("/protected", { replace: true });
        } else {
            navigate("/");
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-dark py-3 shadow position-sticky top-0 z-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <a
                        className="text-decoration-none"
                        href="/protected"
                        onClick={handleHomeClick}
                    >
                        <h1 className="text-white">BoolB&B</h1>
                    </a>
                </div>

                {/* Hamburger menu for mobile */}
                <button
                    className="navbar-toggler d-lg-none border-0 text-white"
                    type="button"
                    onClick={toggleMenu}
                >
                    <i className="bi bi-list fs-1"></i>
                </button>

                {/* Searchbar visible only on larger screens */}
                <div className="d-none d-lg-flex justify-content-center">
                    <Searchbar />
                </div>

                <nav
                    className={`nav flex-column flex-lg-row align-items-center ${isMenuOpen ? "d-flex" : "d-none"
                        } d-lg-flex`}
                >
                    <ul className="list-unstyled m-0 p-0 d-flex flex-column flex-lg-row align-items-center">
                        {isAuthenticated ? (
                            <>
                                <li className="mx-2">
                                    <a
                                        href="/new-apartment"
                                        className="btn btn-light text-dark text-decoration-none"
                                    >
                                        Aggiungi Appartamento
                                    </a>
                                </li>
                                <li className="mx-2">
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-light text-dark text-decoration-none"
                                    >
                                        Logout
                                    </button>
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
                            <LoginButton setIsAuthenticated={setIsAuthenticated} />
                        )}
                    </ul>
                </nav>
            </div>

            {/* Searchbar for mobile (visible only when the menu is open) */}
            {isMenuOpen && (
                <div className="d-lg-none mt-3">
                    <Searchbar />
                </div>
            )}
        </header>
    );
}
