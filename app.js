const express = require('express');
const server = express();
const BnbRouter = require('./routes/BnbRoutes')
const cors = require('cors')

server.use(cors());

const HOST = process.env.HOST
const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
})

server.get('/', (req, res) => {
    res.send('Server is up and running')
})

// BnB Routes
server.use('/appartamenti', BnbRouter)
