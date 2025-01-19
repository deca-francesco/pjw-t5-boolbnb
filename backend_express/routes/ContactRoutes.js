const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/ContactController');

router.post('/:apartmentId', sendContactEmail);

module.exports = router;
