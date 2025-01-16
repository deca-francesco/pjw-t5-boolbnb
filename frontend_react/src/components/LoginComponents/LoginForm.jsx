export default function LoginForm({
    isLogin,
    setIsLogin,
    formData,
    handleChange,
    handleSubmit,
    message,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
}) {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">
                                {isLogin ? "Login" : "Registrazione"}
                            </h2>

                            <form onSubmit={handleSubmit}>

                                {/* Name and Last Name visible only for registration */}
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
                                                className={`form-control ${message && message.includes('nome') ? 'is-invalid' : ''}`}
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
                                                className={`form-control ${message && message.includes('cognome') ? 'is-invalid' : ''}`}
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <strong>Email {!isLogin && <span className="text-danger">*</span>}</strong>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control ${message && message.includes('email') ? 'is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <strong>Password {!isLogin && <span className="text-danger">*</span>}</strong>
                                    </label>
                                    <div className="input-group position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className={`form-control rounded ${message && message.includes('password') ? 'border-danger' : ''}`}
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary position-absolute"
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                padding: '0',
                                                fontSize: '1.2rem',
                                                color: '#6c757d',
                                                zIndex: 1, // Assicurati che l'icona sia sopra l'input
                                            }}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash text-primary' : 'bi-eye text-primary'}`}></i>
                                        </button>
                                    </div>

                                    {/* Se c'è un messaggio di errore per la password */}
                                    {message && message.includes('password') && (
                                        <div className="text-danger mt-1">
                                            {message}
                                        </div>
                                    )}
                                </div>

                                {/* Confirm password visible only for registration */}
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="confirm_password" className="form-label">
                                            <strong>Conferma Password *</strong>
                                        </label>
                                        <div className="input-group position-relative">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirm_password"
                                                name="confirm_password"
                                                className={`form-control rounded ${message && message.includes('conferma password') ? 'border-danger' : ''}`}
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary position-absolute"
                                                onClick={toggleConfirmPasswordVisibility}
                                                style={{
                                                    right: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    border: 'none',
                                                    background: 'transparent',
                                                    cursor: 'pointer',
                                                    padding: '0',
                                                    fontSize: '1.2rem',
                                                    color: '#6c757d',
                                                    zIndex: 1, // Assicurati che l'icona sia sopra l'input
                                                }}
                                            >
                                                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash text-primary' : 'bi-eye text-primary'}`}></i>
                                            </button>
                                        </div>

                                        {/* If there is an error for the confirm password */}
                                        {message && message.includes('conferma password') && (
                                            <div className="text-danger mt-1">
                                                {message}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Phone number visible only for registration */}
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

                                {!isLogin && (
                                    <div className="pb-3">
                                        I campi contrassegnati da "*" sono <strong>obbligatori</strong>
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
    );
}
