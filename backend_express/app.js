const express = require('express');
const server = express();
const ApartmentsRoutes = require('./routes/apartmentsRoutes')
const ownerRoutes = require('./routes/ownerRoutes')
const cors = require('cors')
const NotFound = require('./middleware/NotFound')
const ServerErrorsHandler = require('./middleware/ServerErrorsHandler')

// cors policy unlock only for this domain
server.use(cors({ origin: process.env.WEBAPP_FRONT_ORIGIN }))

// body parser
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
server.use('/apartments', ApartmentsRoutes)

// Owners' Routes
server.use('/owners', ownerRoutes)

// Handle 404 errors
server.use(NotFound)

// Handle 500 errors
server.use(ServerErrorsHandler)