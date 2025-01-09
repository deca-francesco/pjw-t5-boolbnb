const express = require('express');
const server = express();
const BnbRouter = require('./routes/bnbRoutes')
const cors = require('cors')

const HOST = process.env.HOST
const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log(`Server is listening on port ${HOST}:${PORT}`);
})

server.use(cors());