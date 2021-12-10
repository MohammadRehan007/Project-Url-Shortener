const express = require('express');

const router = express.Router();

const urlController = require('../controllers/urlController');



//1)for saving college details
router.post('/url/shorten', urlController.generateUrl);
router.get('/:urlCode', urlController.redirectToUrlCode);










module.exports = router;