const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})

	const userObjects = helper.initialUsers.map(u => new User(u))
	const promiseArray = userObjects.map(u => u.save())
	await Promise.all(promiseArray)
})

describe('user creation', () => {
	test('create user with new username success', async () => {
		const newUser = {
			username:'tom',
			name:'tom hanks',
			password:'letmein'
		}
		await api.post('/api/users')
			.send(newUser)
			.expect(200)

		const usersAtEnd = await helper.usersInDb()
		console.log(usersAtEnd)
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
	})
	test('enforce unique username', async () => {
		const newUser = {
			username:'root',
			name:'clark kent',
			password:'secret'
		}
		const res = await api.post('/api/users')
			.send(newUser)
			.expect(400)
		console.log(res.body.error)

		const usersAtEnd = await helper.usersInDb()
		console.log(usersAtEnd)
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})
	test('enforce username length', async () => {
		const newUser = {
			username:'s',
			name:'short',
			password:'secret'
		}
		await api.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})
	test('enforce pw length', async () => {
		const newUser = {
			username:'sllllluurp',
			name:'short',
			password:'s'
		}
		await api.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
	})
})
describe('user login', () => {
	test('make user and login', async () => {
		const newUser = {
			username:'gigabyte',
			name:'big data',
			password:'megabyte'
		}
		user = await api.post('/api/users').send(newUser)
		login = await api.post('/api/login').send(newUser)
	})
	test('post req login with correct credentials', async () => {
		const newUser = {
			username:'gigabyte',
			name:'big data',
			password:'megabyte'
		}
		user = await api.post('/api/users').send(newUser)
		login = await api.post('/api/login').send(newUser)
			.expect(200)
		expect(login.body.token).toBeDefined()
	})
	test('post req login incorrect credentials', async () => {
		const newUser = {
			username:'gigabyte',
			name:'big data',
			password:'megabyte'
		}
		user = await api.post('/api/users').send(newUser)
		login = await api.post('/api/login').send({username:'gigabyte', password:'fan'})
			.expect(401)
		expect(login.body.token).toBeUndefined()
	})
})

afterAll(() => {
  mongoose.connection.close()
})