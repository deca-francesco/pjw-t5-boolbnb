import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../LoginComponents/LoginButton";
import Searchbar from "./Searchbar";

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
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

    return (
        <header className="bg-dark py-3 shadow position-sticky top-0 z-3">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Logo */}
                    <div className="logo">
                        <a
                            className="text-decoration-none"
                            href="/protected"
                            onClick={handleHomeClick}
                        >
                            <h1 className="text-white">BoolB&B</h1>
                        </a>
                    </div>

                    {/* Toggle Button for Hamburger Menu */}
                    <button
                        className="navbar-toggler d-lg-none border-0 text-white"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                        aria-controls="navbarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-list fs-1"></i>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="d-none d-lg-flex justify-content-center align-items-center">
                        <Searchbar className="me-3" /> {/* Searchbar visibile in desktop */}
                        <nav>
                            <ul className="list-unstyled m-0 d-flex align-items-center">
                                {isAuthenticated ? (
                                    <>
                                        <li className="mx-2">
                                            <a
                                                href="/new-apartment"
                                                className="btn btn-transparent text-white text-decoration-none"
                                            >
                                                Aggiungi Appartamento
                                            </a>
                                        </li>
                                        <li className="mx-2">
                                            <button
                                                onClick={handleLogout}
                                                className="btn btn-transparent text-white text-decoration-none"
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
                                    <LoginButton
                                        setIsAuthenticated={setIsAuthenticated}
                                        className="btn btn-transparent text-white text-decoration-none"
                                    />
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Collapsible Mobile Navigation */}
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <nav className="nav flex-column align-items-end mt-3">
                        <ul className="list-unstyled m-0 p-0 w-100">
                            {isAuthenticated ? (
                                <>
                                    <li className="mb-2 w-100">
                                        <a
                                            href="/new-apartment"
                                            className="btn btn-transparent text-white w-100 text-end"
                                        >
                                            Aggiungi Appartamento
                                        </a>
                                    </li>
                                    <li className="mb-2 w-100">
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-transparent text-white w-100 text-end"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                    {userId && (
                                        <li className="mb-2 w-100">
                                            <a
                                                href={`/owners/${userId}`}
                                                className="btn btn-transparent text-white w-100 text-end"
                                            >
                                                <i className="bi bi-person-circle me-2"></i> Profilo
                                            </a>
                                        </li>
                                    )}
                                </>
                            ) : (
                                <li className="w-100">
                                    <LoginButton
                                        setIsAuthenticated={setIsAuthenticated}
                                        className="btn btn-transparent text-white w-100 text-end"
                                    />
                                </li>
                            )}
                        </ul>
                    </nav>

                    {/* Mobile Searchbar */}
                    <div className="mt-3">
                        <Searchbar />
                    </div>
                </div>
            </div>
        </header>
    );
}
