const express = require('express');
const router = express.Router();
const articleController = require('../controller/common/Article.controller');
const authMiddleware = require('../app/middleware/AuthJwt');
const isAuth = authMiddleware.isAuth;

router.get('/article/', isAuth, articleController.getAllArticles);
router.get('/article/:id', isAuth, articleController.getArticleById);
router.post('/article/', isAuth, articleController.createArticle);
router.put('/:id', isAuth,articleController.updateArticle);

module.exports = router;
