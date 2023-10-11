const newsService = require('../services/newsService')
const { DEFAULT_RESPONSE } = require('../constants')
const jwt = require('jsonwebtoken')

module.exports.getNews = async (req, res) => {
  const defaultResponse = { ...DEFAULT_RESPONSE }
  try {
    const user = await jwt.decode(req.headers.authorization)
    const email = user.sub

    if (!email) {
      defaultResponse.status = 403
      defaultResponse.message = USER_MESSAGE.forbidden
      return res.send(defaultResponse)
    }

    const response = await newsService.getNews(email)
    defaultResponse.status = 200
    defaultResponse.message = 'News fetched successfully'
    defaultResponse.data = response
    return res.send(defaultResponse)
  } catch (error) {
    console.log('Error while fetching news. Details: ', error);
    defaultResponse.status = 500
    defaultResponse.message = error.message
    return res.send(defaultResponse)
  }
}

module.exports.searchNews = async (req, res) => {
  const defaultResponse = { ...DEFAULT_RESPONSE }
  try {
    const user = await jwt.decode(req.headers.authorization)
    const email = user.sub
    
    if (!email) {
      defaultResponse.status = 403
      defaultResponse.message = USER_MESSAGE.forbidden
      return res.send(defaultResponse)
    }

    const { keyword } = req.params
    const response = await newsService.searchNews(keyword)
    
    defaultResponse.status = 200
    defaultResponse.message = `News searched successfully for keyword: ${keyword}`
    defaultResponse.data = response
    return res.send(defaultResponse)
  } catch (error) {
    console.log('Error while searching news. Details: ', error);
    defaultResponse.status = 500
    defaultResponse.message = error.message
    return res.send(defaultResponse)
  }
}