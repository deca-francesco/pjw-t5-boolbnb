import { useNavigate } from "react-router-dom";

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
                        className="btn btn-light text-dark mx-3"
                        style={{ zIndex: 10, marginLeft: '10px' }}
                    >
                        Crea Appartamento
                    </button>
                    <button
                        onClick={handleLogout}
                        className="btn btn-light text-dark mx-3"
                        style={{ zIndex: 10 }}
                    >
                        Logout
                    </button>


                </>
            ) : (
                <button
                    onClick={handleLogin}
                    className="btn btn-light"
                    style={{ zIndex: 10 }}
                >
                    Login / Registrati
                </button>
            )}
        </div>
    );
}
