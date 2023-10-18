const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers && req.headers['authorization']
  if (!token) return res.status(401).send('Unauthorized')

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Forbidden')
    req.user = user
    next()
  })
}