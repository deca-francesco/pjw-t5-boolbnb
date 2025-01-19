const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

// Middleware to check the token
function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Accesso negato!' });
    }

    console.log("Token ricevuto nel backend:", token);

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error("Errore nella verifica del token:", err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: `Sessione scaduta! effettua nuovamente l'accesso` });
        }
        return res.status(400).json({ message: 'Accesso negato!' });
    }
}


module.exports = verifyToken 