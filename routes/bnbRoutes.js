// import express
const express = require('express');

// create router
const router = express.Router();

// import controller
const BnbController = require('../controllers/BnbController');

// index route
router.get('/', BnbController.index)

// show route
router.get('/:id', BnbController.show)

// review route
router.post("/:id/recensione", BnbController.review)



module.exports = router;
