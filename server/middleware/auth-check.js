const jwt = require('jsonwebtoken')
// const User = require('mongoose').model('User')
const { User, validPass } = require('../models/db')
const config = require('../../config')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end() }
    console.log('this is jwt decoded:', decoded)
    const userId = decoded.sub

    // check if a user exists
    User.findById(userId)
    .then(user => {
      if (user) {
        return next()
      }

      return res.status(401).end()
    })
  })
}
