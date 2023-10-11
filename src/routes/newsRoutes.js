const express = require('express')
const Router = express.Router();

const { getNews } = require('../controllers/newsController');
Router.get('/', getNews);

module.exports = Router
