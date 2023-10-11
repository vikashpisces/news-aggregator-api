const express = require('express')
const Router = express.Router();

const { getNews, searchNews } = require('../controllers/newsController');

Router.get('/', getNews);
Router.get('/search/:keyword', searchNews)

module.exports = Router
