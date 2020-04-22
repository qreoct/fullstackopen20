const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  console.log('************ hello received body: ', body)

  const user = await User.findOne({ username: body.username })
  console.log('************ found user: ', user)
  console.log('************ found user pwhash: ', user.passwordHash)
  console.log('************ found user id: ', user.id)
  console.log('************ found user _id: ', user._id)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  console.log('************ pwcorrect: ', passwordCorrect)
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  console.log('************ created token: ', token)
  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter