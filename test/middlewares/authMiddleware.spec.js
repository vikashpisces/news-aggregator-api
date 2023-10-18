const authMiddleWare = require('../../src/middlewares/authMiddleWare')
const jwt = require('jsonwebtoken')
require('dotenv').config();

describe('Module: authMiddleware', () => {
  describe('Verify methods', () => {

    describe('verifyToken', () => {
      const mockRequest = (headers) => {
        return headers
      }
      
      const mockResponse = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.send = jest.fn().mockReturnValue(res)
        return res
      }

      const mockNext = jest.fn();
      beforeEach(() => { })

      afterEach(() => {
        mockNext.mockClear()
      })

      it('should verify missing request headers', () => {
        const req = mockRequest({})
        const res = mockResponse()

        authMiddleWare.verifyToken(req, res, mockNext);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(401);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith('Unauthorized');

        expect(mockNext).not.toHaveBeenCalled();
      })

      it('should verify missing request headers: authorization', () => {
        const req = mockRequest({
          headers: {}
        })
        const res = mockResponse()

        authMiddleWare.verifyToken(req, res, mockNext);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(401);

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith('Unauthorized');

        expect(mockNext).not.toHaveBeenCalled();

      })

      it('should verify invalid token', () => {
        const req =  mockRequest({
          headers: {
            authorization: 'invalidToken'
          }
        })
        const res = mockResponse()
        
        authMiddleWare.verifyToken(req, res, mockNext);
        
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(403)
        
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith('Forbidden');

        expect(mockNext).not.toHaveBeenCalled();
        
      })

      it('should verify valid token, set req.user and call next', () => {
        const token = jwt.sign({
          id: 123,
          role: 'admin',
          sub: 'some email'
        }, process.env.JWT_SECRET, { expiresIn: 86400 })
        
        const req = mockRequest({
          headers: {
            authorization: token
          }
        })
        const res = mockResponse()
        
        expect(req.user).not.toBeDefined();

        authMiddleWare.verifyToken(req, res, mockNext);
        
        expect(res.status).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(req.user).toBeDefined();
        
      })

    })  
  })  
})