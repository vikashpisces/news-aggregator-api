const jwt = require('jsonwebtoken')
const preferenceService = require('../services/userPreferenceService')
const { DEFAULT_RESPONSE, USER_MESSAGE } = require('../constants')

module.exports.getPreferences = async (req, res) => {
  const defaultResponse = { ...DEFAULT_RESPONSE }
  try {
    const user = await jwt.decode(req.headers.authorization)
    const email = user.sub
    if (!email) {
      defaultResponse.status = 403
      defaultResponse.message = USER_MESSAGE.forbidden
      return res.send(defaultResponse)
    }
    const response = await preferenceService.getPreferences(email)
    defaultResponse.status = 200
    defaultResponse.message = `News Categories fetched successfully`
    defaultResponse.data = response
    return res.send(defaultResponse)
  } catch (error) {
    defaultResponse.status = 500
    defaultResponse.message = error.message
    return res.send(defaultResponse)
  }
}

module.exports.setPreferences = async (req, res) => {
  const defaultResponse = { ...DEFAULT_RESPONSE }
  try {
    const user = await jwt.decode(req.headers.authorization)
    const email = user.sub
    if (!email) {
      defaultResponse.status = 403
      defaultResponse.message = USER_MESSAGE.forbidden
      return res.send(defaultResponse)
    }

    const { category } = req.body
    
    if (!category) {
      defaultResponse.status = 400
      defaultResponse.message = 'Please provide a category preference'
      return res.send(defaultResponse)
    }

    preferenceService.setPreferences(email, category)

    defaultResponse.status = 200
    defaultResponse.message = `News Categories set successfully`
    defaultResponse.data = category
    return res.send(defaultResponse)
  } catch (error) {
    console.log('Error while setting preferences. Details: ', error);
    defaultResponse.status = 500
    defaultResponse.message = error.message
    return res.send(defaultResponse)
  }
}