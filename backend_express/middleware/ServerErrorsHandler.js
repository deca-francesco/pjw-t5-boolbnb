//handle server errors (500)
const ServerErrorsHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: "Errore 500 del server"
    })
}
module.exports = ServerErrorsHandler