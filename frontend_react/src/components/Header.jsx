import { useState, useEffect } from "react"
import LoginButton from './LoginButton'

export default function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        setIsAuthenticated(false)

        window.location.href = '/'
    }

    return (

        <header className="bg-dark py-3 px-4 shadow ">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo">
                    <h1 className="text-white">BoolB&b</h1>
                </div>

                <nav className="nav">
                    <ul className="d-flex list-unstyled m-0">
                        <li className="mx-3">
                            <a href="/" className="text-white text-decoration-none">Home</a>
                        </li>


                        {isAuthenticated ? (
                            <>
                                {/* Link per l'aggiunta dell'appartamento */}
                                <li className="mx-3">
                                    <a href="/add-apartment" className="btn btn-link text-white text-decoration-none">Aggiungi Appartamento</a>
                                </li>
                                {/* Link per il logout */}
                                <li className="mx-3">
                                    <button onClick={handleLogout} className="btn btn-link text-white text-decoration-none">Logout</button>
                                </li>
                            </>
                        ) : (

                            <LoginButton setIsAuthenticated={setIsAuthenticated} />

                            /* altri link navigazione */

                        )}
                    </ul>
                </nav>

                {/* componente searchbar */}


            </div>
        </header>

    )
}