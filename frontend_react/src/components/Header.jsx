export default function Header() {

    return (
        <>
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
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}