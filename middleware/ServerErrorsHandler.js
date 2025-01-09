//gestire gli errori del server (500)
const ServerErrorsHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
}
module.exports = ServerErrorsHandler