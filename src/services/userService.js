const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { USER_MESSAGE } = require('../constants')
const jsonwebtoken = require('jsonwebtoken')

module.exports.userSignup = async (payload) => {
  const user = new User(payload)
  const existingUser = await User.findOne({ email: user.email })
  if (existingUser) {
    return Promise.reject({status: 400, message: 'User already exists'})
  }
  user.password = bcrypt.hashSync(user.password, 8)
  return user.save()
}

module.exports.userLogin = async (payload) => {
  const user = await User.findOne({ email: payload.email })
  if (!user) {
    return Promise.reject({status: 401, message: USER_MESSAGE.invalidUserPwd})
  }

  const isPasswordValid = bcrypt.compareSync(payload.password, user.password)
  if (!isPasswordValid) {
    return Promise.reject({status: 401, message: USER_MESSAGE.invalidUserPwd})
  }

  const token = jsonwebtoken.sign(
    { id: user._id, role: user.role, sub: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400
    })
  return token
}