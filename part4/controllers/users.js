const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res) => {
	const body = req.body

	if (body.password.length < 3){ return res.status(400).send({error: 'password must be at least 3 characters long!'})}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User ({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
	const users = await User
		.find({}).populate('blogs', {title:1, author:1, url:1, likes:1})
	// under the 'blogs' field of each user, REPLACE (populate) it with the
	// appropriate 'blog' element
	res.json(users.map( u => u.toJSON()))
})

module.exports = usersRouter