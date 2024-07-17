const express = require('express');
const router = express.Router();
const articleController = require('../app/controllers/Article.controller');
const authMiddleware = require('../app/middleware/AuthJwt');
const isAuth = authMiddleware.isAuth;

router.get('/article/', articleController.index);
router.get('/article/:id', articleController.show);
router.post('/article/', isAuth, articleController.store);
router.put('/:id', isAuth,articleController.update);

module.exports = router;
