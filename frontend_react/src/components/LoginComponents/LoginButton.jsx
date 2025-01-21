import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LoginButton({ setIsAuthenticated }) {
    const navigate = useNavigate();

    // Reiderecting to login page
    const handleLogin = () => {
        navigate('/login');
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    // Reiderecting to create a new apartment page
    const handleCreateApartment = () => {
        navigate('/new-apartment');
    };

    // Check if a token is in the localStorage
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    return (
        <div>
            {isAuthenticated ? (
                <>

                    <button
                        onClick={handleCreateApartment}
                        className="btn btn-light text-dark mx-3 fs-4"
                        style={{ zIndex: 10, marginLeft: '10px' }}
                    >
                        Crea Appartamento
                    </button>
                    <button
                        onClick={handleLogout}
                        className="btn btn-light text-dark mx-3 fs-4"
                        style={{ zIndex: 10 }}
                    >
                        Logout
                    </button>


                </>
            ) : (
                <button
                    onClick={handleLogin}
                    className="btn btn-transparent text-white text-decoration-none fs-4"
                    style={{ zIndex: 10 }}
                >
                    <p className="fs-4"><FontAwesomeIcon icon={faRightToBracket}/> / Registrati</p>
                </button>
            )}
        </div>
    );
}
