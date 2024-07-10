const express = require('express');
const router = express.Router();
const articleController = require('../controller/common/Article.controller');

router.get('/article/', articleController.getAllArticles);
router.get('/article/:id', articleController.getArticleById);
router.post('/article/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);

module.exports = router;
