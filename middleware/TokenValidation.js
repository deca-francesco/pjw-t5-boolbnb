const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

// Middleware to check the token
function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Accesso negato!' })

    try {
        const verified = jwt.verify(token, JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        return res.status(400).json({ message: 'Token non valido', err })
    }
}

module.exports = verifyToken 