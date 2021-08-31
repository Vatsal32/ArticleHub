const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesControllers');

router.get('/', articlesController.getAll);

router.get('/myarticles', articlesController.isAuthenticated, articlesController.myArticles);

router.get('/:id', articlesController.isAuthenticated, articlesController.getArticle);

router.post('/add', articlesController.isAuthenticated, articlesController.createArticle);

router.post('/edit/:id', articlesController.isAuthenticated, articlesController.editArticle);

router.delete('/delete/:id', articlesController.isAuthenticated, articlesController.removeArticle);

module.exports = router;