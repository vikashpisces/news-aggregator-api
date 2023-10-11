const express = require('express');
const Router = express.Router()
const { getPreferences, setPreferences } = require('../controllers/userPreferenceController')

Router.get('/', getPreferences)
Router.put('/', setPreferences)

module.exports = Router