const userPreferenceService = require('../../src/services/userPreferenceService')
const localData = require('../../src/data/db.json')

describe('Module: userPreferenceService', () => {

  describe('Method: getPreferences', () => {
    it('should return null when there is no preference data available', async () => { 
      const response = await userPreferenceService.getPreferences()
      expect(response).toBe(null)
    })

    it('should return null when there is no matching preference data available for an user', async () => { 
      const userEmail = 'someUser@example.com'
      const response = await userPreferenceService.getPreferences(userEmail)
      expect(response).toBe(null)
    })

    it('should return preferences for a matching user in the data', async () => { 
      const userEmail = 'someUser@example.com'
      const mockedPreferenceData = { email: userEmail, category: 'business'}
      localData.preferences.push(mockedPreferenceData)
      const response = await userPreferenceService.getPreferences(userEmail)
      expect(response).toStrictEqual(mockedPreferenceData)
    })
  })

  describe('Method: setPreferences', () => {
    it('should create a new preference entry for an user, if not already exists', async () => { 
      const userEmail = 'someUser@example.com'
      const mockedPreferenceData = { email: userEmail, category: 'business' }
      localData.preferences = []
      const preferenceBeforeSetting = localData.preferences.find(pref => pref.email === userEmail) || null

      expect(preferenceBeforeSetting).toBe(null)

      await userPreferenceService.setPreferences(userEmail, 'business')
      const preferenceAfterSetting = localData.preferences.find(pref => pref.email === userEmail) || null
      expect(preferenceAfterSetting).toStrictEqual(mockedPreferenceData)
    })

    it('should update the preference for an already existing user preference', async () => { 
      const userEmail = 'someUser@example.com'
      const mockedPreferenceDataPreSet = { email: userEmail, category: 'business' }
      const mockedPreferenceDataPostSet = { email: userEmail, category: 'sports' }
      const preferenceBeforeSetting = localData.preferences.find(pref => pref.email === userEmail) || null

      expect(preferenceBeforeSetting).toStrictEqual(mockedPreferenceDataPreSet)

      await userPreferenceService.setPreferences(userEmail, 'sports')
      const preferenceAfterSetting = localData.preferences.find(pref => pref.email === userEmail) || null
      expect(preferenceAfterSetting).toStrictEqual(mockedPreferenceDataPostSet)
    })
  })
})