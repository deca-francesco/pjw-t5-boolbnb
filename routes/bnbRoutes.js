// import express
const express = require('express');

// create router
const router = express.Router();

// import controller appartamenti
const BnbController = require('../controllers/BnbController');

// index apartments route
router.get('/', BnbController.index)

// show apartment route
router.get('/:id', BnbController.show)

// review route
router.post("/:id/recensione", BnbController.review)

// create apartment route
router.post('/nuovo/:id', BnbController.create )

module.exports = router;
