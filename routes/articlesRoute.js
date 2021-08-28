const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesControllers');

router.get('/', articlesController.getAll);

router.get('/myarticles', articlesController.myArticles);

router.get('/:id', articlesController.getArticle);

router.post('/add', articlesController.createArticle);

router.post('/edit/:id', articlesController.editArticle);

router.delete('/delete/:id', articlesController.removeArticle);

module.exports = router;