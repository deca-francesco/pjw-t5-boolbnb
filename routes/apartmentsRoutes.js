// import express
const express = require('express');

// create router
const router = express.Router();

// import controller appartamenti
const ApartmentsController = require('../controllers/ApartmentsController');

// index apartments route
router.get('/', ApartmentsController.index)

// show apartment route
router.get('/:id', ApartmentsController.show)

// review route
router.post("/review/:id", ApartmentsController.review)

// create apartment route
router.post('/new/:id', ApartmentsController.create)

module.exports = router;
