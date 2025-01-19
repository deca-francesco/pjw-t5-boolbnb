export default function LoginForm({
    isLogin,
    setIsLogin,
    formData,
    handleChange,
    handleSubmit,
    message,
    messageType,
    fieldErrors,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
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

                            {/* Messaggio globale */}
                            {message && (
                                <div
                                    className={`alert ${messageType === 'error' ? 'alert-danger' : 'alert-success'}`}
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Nome e Cognome solo per la registrazione */}
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
                                                className={`form-control ${fieldErrors?.name ? 'is-invalid' : ''}`}
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            {fieldErrors?.name && (
                                                <div className="invalid-feedback">
                                                    {fieldErrors.name}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="last_name" className="form-label">
                                                <strong>Cognome *</strong>
                                            </label>
                                            <input
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                className={`form-control ${fieldErrors?.last_name ? 'is-invalid' : ''}`}
                                                value={formData.last_name}
                                                onChange={handleChange}
                                            />
                                            {fieldErrors?.last_name && (
                                                <div className="invalid-feedback">
                                                    {fieldErrors.last_name}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <strong>Email *</strong>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-control ${fieldErrors?.email ? 'is-invalid' : ''}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {fieldErrors?.email && (
                                        <div className="invalid-feedback">
                                            {fieldErrors.email}
                                        </div>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <strong>Password *</strong>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className={`form-control rounded ${fieldErrors?.password ? 'is-invalid' : ''}`}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash text-primary' : 'bi-eye text-primary'}`}></i>
                                        </button>
                                    </div>
                                    {fieldErrors?.password && (
                                        <div className="invalid-feedback">
                                            {fieldErrors.password}

                                        </div>

                                    )}
                                </div>

                                {/* Conferma Password (solo per registrazione) */}
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="confirm_password" className="form-label">
                                            <strong>Conferma Password *</strong>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirm_password"
                                                name="confirm_password"
                                                className={`form-control rounded ${fieldErrors?.confirm_password ? 'is-invalid' : ''}`}
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                <i className={`bi ${showConfirmPassword ? 'bi-eye-slash text-primary' : 'bi-eye text-primary'}`}></i>
                                            </button>
                                        </div>
                                        {fieldErrors?.confirm_password && (
                                            <div className="invalid-feedback" style={{ display: "block" }} >
                                                {fieldErrors.confirm_password}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Numero di telefono (solo per registrazione) */}
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="phone_number" className="form-label">
                                            <strong>Numero di Telefono</strong>
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
    );
}
