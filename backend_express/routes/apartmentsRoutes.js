// import express
const express = require('express');

// import middleware for token validation
const verifyToken = require('../middleware/TokenValidation')


// const upload = multer({ dest: "uploads/" }); // Cartella di destinazione per i file caricati
const upload = require('../middleware/Multer')


// create router
const router = express.Router();

// import controller appartamenti
const ApartmentsController = require('../controllers/ApartmentsController');

// index apartments route
router.get('/', ApartmentsController.index);  // Assicurati che questa rotta richiami il metodo index

router.get('/search', ApartmentsController.index);

// show apartment route
router.get('/:id', ApartmentsController.show)

// review route
router.post("/review/:id", ApartmentsController.review)

// create apartment route
router.post('/new', verifyToken, upload.single("image"), ApartmentsController.create)

// vote route
router.post("/vote/:id", ApartmentsController.vote)

// search route
router.get('/search', ApartmentsController.search);

module.exports = router;
