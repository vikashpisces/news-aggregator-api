const authMiddleWare = require('../../src/middlewares/authMiddleWare')
const jwt = require('jsonwebtoken')
require('dotenv').config();

describe('Module: authMiddleware', () => {
  describe('Verify methods', () => {

    describe('verifyToken', () => {
      let responseStatusFunction = jest.fn(function () { return this })
      let responseSendFunction = jest.fn()

      let mockResponse = {
        status: responseStatusFunction,
        send: responseSendFunction
      };

      let mockNext = jest.fn();

      beforeEach(() => { })

      afterEach(() => {
        responseStatusFunction.mockClear();
        responseSendFunction.mockClear();
        mockNext.mockClear()
      })

      it('should verify missing request headers', () => {
        let mockRequest = {}
        
        authMiddleWare.verifyToken(mockRequest, mockResponse, mockNext);

        expect(responseStatusFunction).toHaveBeenCalledTimes(1);
        expect(responseStatusFunction).toHaveBeenCalledWith(401);

        expect(responseSendFunction).toHaveBeenCalledTimes(1);
        expect(responseSendFunction).toHaveBeenCalledWith('Unauthorized');

        expect(mockNext).not.toHaveBeenCalled();
      })

      it('should verify missing request headers: authorization', () => {
        let mockRequest = {
          headers: {}
        }

        authMiddleWare.verifyToken(mockRequest, mockResponse, mockNext);

        expect(responseStatusFunction).toHaveBeenCalledTimes(1);
        expect(responseStatusFunction).toHaveBeenCalledWith(401);

        expect(responseSendFunction).toHaveBeenCalledTimes(1);
        expect(responseSendFunction).toHaveBeenCalledWith('Unauthorized');

        expect(mockNext).not.toHaveBeenCalled();

      })

      it('should verify invalid token', () => {
        let mockRequest = {
          headers: {
            authorization: 'invalidToken'
          }
        }
        
        authMiddleWare.verifyToken(mockRequest, mockResponse, mockNext);
        
        expect(responseStatusFunction).toHaveBeenCalledTimes(1);
        expect(responseStatusFunction).toHaveBeenCalledWith(403)
        
        expect(responseSendFunction).toHaveBeenCalledTimes(1);
        expect(responseSendFunction).toHaveBeenCalledWith('Forbidden');

        expect(mockNext).not.toHaveBeenCalled();
        
      })

      it('should verify valid token, set req.user and call next', () => {
        const token = jwt.sign({
          id: 123,
          role: 'admin',
          sub: 'some email'
        }, process.env.JWT_SECRET, { expiresIn: 86400 })
        
        let mockRequest = {
          headers: {
            authorization: token
          }
        }
        
        expect(mockRequest.user).not.toBeDefined();

        authMiddleWare.verifyToken(mockRequest, mockResponse, mockNext);
        
        expect(responseStatusFunction).not.toHaveBeenCalled()
        expect(responseSendFunction).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockRequest.user).toBeDefined();
        
      })

    })  
  })  
})