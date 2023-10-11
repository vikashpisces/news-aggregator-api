const userService = require('../services/userService')
const { DEFAULT_RESPONSE, USER_MESSAGE } = require('../constants')

const userSignup = async (req, res) => {
  const defaultResponse = { ...DEFAULT_RESPONSE }
  try {
    const user = await userService.userSignup(req.body)
    if (user) {
      defaultResponse.status = 201
      defaultResponse.message = USER_MESSAGE.userCreated
      return res.send(defaultResponse)
    }
  } catch (error) {
    console.log('Error while registering a new user. Details: ', error);
    defaultResponse.status = error.status || 500
    defaultResponse.message = error.message
    return res.send(defaultResponse)
  }
}

const userLogin = async (req, res) => {
  const defaultResponse = { ...DEFAULT_RESPONSE }
  try {
    const response = await userService.userLogin(req.body)
    defaultResponse.status = 200
    defaultResponse.message = USER_MESSAGE.userAuthenticated
    defaultResponse.data = response
    return res.send(defaultResponse)
  } catch (error) {
    defaultResponse.status = error.status || 401
    defaultResponse.message = error.message || USER_MESSAGE.invalidUserPwd
    return res.send(defaultResponse)
  }
}

module.exports = {
  userSignup,
  userLogin
}