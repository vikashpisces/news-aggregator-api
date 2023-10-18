const newsService = require('../../src/services/newsService')
const axios = require('axios');

jest.mock('axios')
describe('Module: newsService', () => {
  describe('Method: getNews', () => {
    
    beforeEach(() => { })
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should return error when API call fails', async () => {
      axios.get.mockRejectedValue({ status: 404, message: 'Request failed with status code 404' })
      try {
        const response = await newsService.getNews('testEmail')
      } catch (error) {
        console.log("error");
        console.log(error);
        expect(error.message).toBe('Request failed with status code 404')
        expect(error.status).toBe(404)
      }
    })
  })
})