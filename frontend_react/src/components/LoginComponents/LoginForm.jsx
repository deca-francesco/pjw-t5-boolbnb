export default function LoginForm({ isLogin, setIsLogin, formData, handleChange, handleSubmit, errorMessage, showPassword, togglePasswordVisibility }) {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
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
                                                <strong>Nome *</strong>
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
                                                <strong>Cognome *</strong>
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
                                        <strong>Email *</strong>
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
                                        <strong>Password *</strong>
                                    </label>
                                    <div className="input-group position-relative ">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="form-control rounded"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                padding: '0',
                                                fontSize: '1.2rem',
                                                color: '#6c757d',
                                            }}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash text-primary' : 'bi-eye text-primary'}`}></i>
                                        </button>
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="phone_number" className="form-label">
                                            <strong>Numero di telefono</strong>
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
                                <div className="pb-3">I campi contrassegnati da "*" sono <strong>obbligatori</strong></div>
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
