const localData = require('../data/db.json')

module.exports.getPreferences = async (userEmail) => {
  const { preferences } = localData
  const userPreferences = preferences?.find(pref => pref.email === userEmail) || null

  return userPreferences
}

module.exports.setPreferences = async (userEmail, category) => {
  const { preferences } = localData
  const userPreferences = preferences?.find(pref => pref.email === userEmail) || null

  // available categories: business, entertainment, general, health, science, sports, technology
  
  if (!userPreferences) {
    localData.preferences.push({ email: userEmail, category })
  } else {
    userPreferences.category = category
  }
}