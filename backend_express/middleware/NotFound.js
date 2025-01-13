//  Middleware to handle 404 errors 

const NotFound = (req, res, next) => {
    res.status(404).json({ err: 'not found' })
}

module.exports = NotFound