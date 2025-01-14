export default function Footer() {

    return (
        <>
            <footer className="bg-dark py-5 text-white d-flex justify-content-between">
                <div className="container">
                    <div className="row row-cols-md-3 row-cols-lg-3 row-cols-sm-1">
                        <div className="about col">
                            <nav>
                                <h5 className="mb-3">ABOUT US</h5>
                                <ul className="list-unstyled">
                                    <li> <a href="/" className="text-white text-decoration-none"> <strong>Chi siamo</strong> </a> </li>
                                    <li> <a href="/" className="text-white text-decoration-none"> <strong>Privacy Policy</strong></a> </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="contact-info col">
                            <h5 className="mb-3">CONTACT US</h5>
                            <p><i className="bi bi-geo-alt"></i> 1234 Main Street, Cityville, Country</p>
                            <p><i className="bi bi-envelope"></i> contact@example.com</p>
                            <p><i className="bi bi-phone"></i> +1 234 567 890</p>
                        </div>


                        <div id="social" className="col d-flex flex-column align-items-center">
                            <h5 className="mb-3">FOLLOW US</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a className="text-decoration-none text-white" href="/"><i className="me-2 bi bi-facebook"></i> <strong>Facebook</strong> </a>
                                </li>
                                <li className="mb-2">
                                    <a className="text-decoration-none text-white" href="/"><i className="me-2 bi bi-twitter"></i> <strong>Twitter</strong> </a>
                                </li>
                                <li className="mb-2">
                                    <a className="text-decoration-none text-white" href="/"><i className="me-2 bi bi-instagram"></i> <strong>Instagram</strong></a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
}