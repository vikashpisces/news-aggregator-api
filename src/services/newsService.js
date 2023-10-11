const { default: axios } = require('axios')
const localData = require('../data/db.json')

module.exports.getNews = async (email) => {
  let NEWS_API_BASE_URL = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}`

  const userPreference = localData.preferences?.find(pref => pref.email === email) || null
  const category = userPreference?.category || 'business'
  

  NEWS_API_BASE_URL = `${NEWS_API_BASE_URL}&category=${category}`

  console.log('NEWS_API_BASE_URL', NEWS_API_BASE_URL)
  const newsResponse = await axios.get(NEWS_API_BASE_URL)
  return newsResponse?.data?.articles
}