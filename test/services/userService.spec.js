const userService = require('../../src/services/userService');
const User = require('../../src/models/UserModel');
const { USER_MESSAGE } = require('../../src/constants');
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

describe('Module: userService', () => {
  describe('Method: userSignup', () => {
    beforeEach(() => { })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should return 400 if user already exists', async () => { 
      const payload = { email: 'test@example.com', password: '12345678' };
      
      const findOne = jest.spyOn(User, 'findOne').mockImplementation(() => {
        return payload
      })

      const save = jest.spyOn(User.prototype, 'save').mockImplementation(() => {
        return 'nothing'
      })

      try {
        const response = await userService.userSignup(payload);
      } catch (error) {
        expect(error.status).toBe(400)
        expect(error.message).toBe('User already exists')
        expect(findOne).toHaveBeenCalledTimes(1)
        expect(save).not.toHaveBeenCalled()
      }
    })

    it('should hash password and save user in database, if unique user', async () => { 
      const payload = { email: 'test@example.com', password: '12345678' };
      
      const findOne = jest.spyOn(User, 'findOne').mockImplementation(() => {
        return null
      })

      const save = jest.spyOn(User.prototype, 'save').mockImplementation(function () { 
        return this
      })
      
      const response = await userService.userSignup(payload);
      expect(save).toHaveBeenCalledTimes(1)
      expect(save.password).not.toBe(payload.password)
    })
  })

  describe('Method: userLogin', () => {
    it('should return 401 if user does not exist', async () => {
      const payload = { email: 'test@example.com', password: '12345678' };
      
      const findOne = jest.spyOn(User, 'findOne').mockImplementation(() => {
        return null
      })

      try {
        const response = await userService.userLogin(payload);
      } catch (error) {
        expect(error.status).toBe(401)
        expect(error.message).toBe(USER_MESSAGE.invalidUserPwd)
      }
    })

    it('should return 401 if password is incorrect', async () => {
      const payload = { email: 'test@example.com', password: '12345678' };
      
      const wrongPassword = 'wrongPassword'
      const findOne = jest.spyOn(User, 'findOne').mockImplementation(() => {
        return { email: payload.email, password: wrongPassword }
      })

      try {
        const response = await userService.userLogin(payload);
      } catch (error) {
        expect(error.status).toBe(401)
        expect(error.message).toBe(USER_MESSAGE.invalidUserPwd)
      }
      
    })

    it('should return 200 and valid token if user is authenticated', async () => { 
      const payload = { email: 'test@example.com', password: '12345678', role: 'admin' };
      
      const validPassword = bcrypt.hashSync(payload.password, 8)
      const findOne = jest.spyOn(User, 'findOne').mockImplementation(() => {
        return { id: 1, email: payload.email, role: 'admin', password: validPassword }
      })

      const response = await userService.userLogin(payload);
      console.log("response");
      console.log(typeof response);
      expect(typeof response).toBe("string")
      await expect(jwt.verify(response, process.env.JWT_SECRET)).resolves
    })
  })
})