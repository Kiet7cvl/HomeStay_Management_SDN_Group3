const express = require('express');
const router = express.Router();
const contactController = require('../controller/common/Contact.controller');

router.get('/contact/', contactController.getAllContacts);
router.get('/contact/:id', contactController.getContactById);
router.post('/contact/', contactController.createContact);

module.exports = router;