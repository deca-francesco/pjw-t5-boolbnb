const express = require('express');
const server = express();
const BnbRouter = require('./routes/BnbRoutes')
const cors = require('cors')
const NotFound = require('./middleware/NotFound')

server.use(cors());

const HOST = process.env.HOST
const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
})

server.get('/', (req, res) => {
    res.send('Server is up and running')
})
server.use(express.json());

// BnB Routes
server.use('/appartamenti', BnbRouter)

// Gestione errore 404
server.use(NotFound)