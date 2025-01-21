import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LoginButton from "../LoginComponents/LoginButton";
import Searchbar from "./Searchbar";
import Bool_Logo from '../../assets/logo_yellow_2.svg';

export default function Header() {
    const { id } = useParams();
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
    }, [id]);

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
        <header className="py-3 shadow position-sticky top-0 z-3 header">
            <div className="container">
                <div className="row align-items-center">
                    {/* Logo */}
                    <div className="col-12 col-md-auto text-center text-md-start mb-3 mb-md-0">
                        <a
                            className="text-decoration-none"
                            href="/protected"
                            onClick={handleHomeClick}
                        >
                            <img src={Bool_Logo} className="logo" alt="BoolB&B logo" style={{ width: 250 }} />
                        </a>
                    </div>

                    {/* Mobile Searchbar (Visible between the logo and the hamburger menu) */}
                    <div className="col-12 d-flex d-lg-none justify-content-center mb-3 mb-lg-0">
                        <Searchbar />
                    </div>

                    {/* Toggle Button for Hamburger Menu */}
                    <div className="col-auto d-lg-none">
                        <button
                            className="navbar-toggler border-0 text-white"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarMenu"
                            aria-controls="navbarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-list fs-1"></i>
                        </button>
                    </div>

                    {/* Desktop Searchbar (Visible only in Desktop, on the same row) */}
                    <div className="col d-none d-lg-flex justify-content-center">
                        <Searchbar />
                    </div>

                    {/* Desktop Navigation (On the same row) */}
                    <div className="col-auto d-none d-lg-flex">
                        <nav>
                            <ul className="list-unstyled m-0 d-flex align-items-center">
                                {isAuthenticated ? (
                                    <>
                                        <li className="mx-2">
                                            <a
                                                href="/new-apartment"
                                                className="btn btn-transparent text-white text-decoration-none fs-4"
                                            >
                                                Aggiungi Appartamento
                                            </a>
                                        </li>
                                        <li className="mx-2">
                                            <button
                                                onClick={handleLogout}
                                                className="btn btn-transparent text-white text-decoration-none fs-4"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                        {userId && (
                                            <li className="mx-2">
                                                <Link to={`/owners/${userId}`}>
                                                    <i className="bi bi-person-circle fs-3 text-white profile-icon" />
                                                </Link>
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
                </div>
            </div>
        </header>
    );
}
