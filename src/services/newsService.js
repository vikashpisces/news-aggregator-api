const { default: axios } = require('axios')
const localData = require('../data/db.json')
const cache = require('memory-cache')


module.exports.getNews = async (email) => {
  let NEWS_API_BASE_URL = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}`

  const userPreference = localData.preferences?.find(pref => pref.email === email) || null
  const category = userPreference?.category || 'business'
  

  NEWS_API_BASE_URL = `${NEWS_API_BASE_URL}&category=${category}`

  console.log('NEWS_API_BASE_URL', NEWS_API_BASE_URL)

  if (cache.get(NEWS_API_BASE_URL)) {
    console.log('Data already present in cache, returning from cache itself')
    return cache.get(NEWS_API_BASE_URL)
  }

  const newsResponse = await axios.get(NEWS_API_BASE_URL)
  cache.put(NEWS_API_BASE_URL, newsResponse?.data?.articles, 60000)
  return newsResponse?.data?.articles
}

module.exports.searchNews = async (keyword) => {
  const NEWS_API_BASE_URL = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.NEWS_API_KEY}`
  console.log('NEWS_API_BASE_URL', NEWS_API_BASE_URL)
  if(cache.get(NEWS_API_BASE_URL)) {
    console.log('Data already present in cache, returning from cache itself')
    return cache.get(NEWS_API_BASE_URL)
  }

  const newsResponse = await axios.get(NEWS_API_BASE_URL)
  cache.put(NEWS_API_BASE_URL, newsResponse?.data?.articles, 60000)
  return newsResponse?.data?.articles
}