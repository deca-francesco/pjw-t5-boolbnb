export default function Footer() {
    return (
        <>
            <footer className="bg-dark py-5 text-white">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3">
                        {/* About Us Section - Hidden in Mobile */}
                        <div className="col mb-4 mb-md-0 d-none d-md-block">
                            <h5 className="mb-3">ABOUT US</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="/" className="text-white text-decoration-none">
                                        <strong>Chi siamo</strong>
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-white text-decoration-none">
                                        <strong>Privacy Policy</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Us Section - Hidden in Mobile */}
                        <div className="col mb-4 mb-md-0 d-none d-md-block">
                            <h5 className="mb-3">CONTACT US</h5>
                            <p>
                                <i className="bi bi-geo-alt"></i> 1234 Main Street, Cityville, Country
                            </p>
                            <p>
                                <i className="bi bi-envelope"></i> contact@example.com
                            </p>
                            <p>
                                <i className="bi bi-phone"></i> +1 234 567 890
                            </p>
                        </div>

                        {/* Follow Us Section - Hidden in Mobile */}
                        <div className="col mb-4 mb-md-0 d-none d-md-block">
                            <h5 className="mb-3">FOLLOW US</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a className="text-decoration-none text-white" href="/">
                                        <i className="me-2 bi bi-facebook"></i> <strong>Facebook</strong>
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="text-decoration-none text-white" href="/">
                                        <i className="me-2 bi bi-twitter"></i> <strong>Twitter</strong>
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a className="text-decoration-none text-white" href="/">
                                        <i className="me-2 bi bi-instagram"></i> <strong>Instagram</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* For Mobile: Show only titles */}
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 d-md-none">
                        <div className="col mb-4 mb-md-0">
                            <h5 className="mb-3">ABOUT US</h5>
                        </div>

                        <div className="col mb-4 mb-md-0">
                            <h5 className="mb-3">CONTACT US</h5>
                        </div>

                        <div className="col mb-4 mb-md-0">
                            <h5 className="mb-3">FOLLOW US</h5>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
