const express = require('express');
const server = express();
const BnbRouter = require('./routes/BnbRoutes')
const ownerRoutes = require('./routes/ownerRoutes')
const cors = require('cors')
const NotFound = require('./middleware/NotFound')
const ServerErrorsHandler = require('./middleware/ServerErrorsHandler')

server.use(cors());

server.use(express.json());

const HOST = process.env.HOST
const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
})

server.get('/', (req, res) => {
    res.send('Server is up and running')
})

// apartments' Routes
server.use('/appartamenti', BnbRouter)

// Owners' Routes
server.use('/proprietari', ownerRoutes)

// Handle 404 errors
server.use(NotFound)

// Handle 500 errors
server.use(ServerErrorsHandler)