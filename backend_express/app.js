const express = require('express');
const server = express();
const ApartmentsRoutes = require('./routes/apartmentsRoutes');
const OwnerRoutes = require('./routes/ownerRoutes');
const ContactRoutes = require('./routes/ContactRoutes')
const cors = require('cors');
const NotFound = require('./middleware/NotFound');
const ServerErrorsHandler = require('./middleware/ServerErrorsHandler');
const path = require('path');
const multer = require('./middleware/Multer');  // Assicurati di importare il middleware multer qui

// cartella per le immagini
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// cors policy unlock only for this domain
server.use(cors({ origin: process.env.WEBAPP_FRONT_ORIGIN }));

// Middleware per gestire i file con multer
// server.use(multer.single('image'));  // Specifica il campo del file, se è 'image'

// body parser per JSON
server.use(express.json());

// Definisci l'host e la porta
const HOST = process.env.HOST;
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is listening on ${HOST}:${PORT}`);
});

server.get('/', (req, res) => {
    res.send('Server is up and running');
});

// apartments' Routes
server.use('/apartments', ApartmentsRoutes);

// Owners' Routes
server.use('/owners', OwnerRoutes);

// Contact's Routes
server.use('/contact', ContactRoutes)

// Handle 404 errors
server.use(NotFound);

// Handle 500 errors
server.use(ServerErrorsHandler);
