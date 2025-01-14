export default function LoginForm({ isLogin, setIsLogin, formData, handleChange, handleSubmit, errorMessage }) {

    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {isLogin ? "Login" : "Registrazione"}
                            </h2>
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="last_name" className="form-label">
                                                Cognome
                                            </label>
                                            <input
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                className="form-control"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="phone_number" className="form-label">
                                            Numero di telefono
                                        </label>
                                        <input
                                            type="text"
                                            id="phone_number"
                                            name="phone_number"
                                            className="form-control"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )}
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary">
                                        {isLogin ? "Accedi" : "Registrati"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin
                                            ? "Non hai un account? Registrati"
                                            : "Hai già un account? Accedi"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}