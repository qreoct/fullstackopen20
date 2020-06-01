const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// create a /reset endpoint that is only accessible during testing.
// allows the db to be reset to a clean slate

testingRouter.post('/reset', async (req,res) => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	res.status(204).end()
})

module.exports = testingRouter