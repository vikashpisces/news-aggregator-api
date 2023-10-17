const constants = require('../../src/constants/index.js');

describe('Module: constants file', () => { 
  it('should contain default response object', () => {
    expect(constants.DEFAULT_RESPONSE).toEqual({
      status: 200,
      message: '',
      data: {}
    })
  })

  describe('Validate User Message Object for', () => {
    it('userCreated key', () => {
      expect(constants.USER_MESSAGE.userCreated).toBe('User Created Successfully')
    })
    it('invalidUserPwd key', () => {
      expect(constants.USER_MESSAGE.invalidUserPwd).toBe('Invalid email or password')
    })
    it('userAuthenticated key', () => {
      expect(constants.USER_MESSAGE.userAuthenticated).toBe('User Authenticated Successfully')
    })
    it('forbidden key', () => {
      expect(constants.USER_MESSAGE.forbidden).toBe('Forbidden')
    })
  })
})