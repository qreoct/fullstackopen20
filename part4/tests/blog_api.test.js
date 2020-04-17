const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map(b => new Blog(b))
	const promiseArray = blogObjects.map(b => b.save())
	await Promise.all(promiseArray)
})

describe('checking state of initial blogs', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('there are two blogs', async () => {
		const res = await api.get('/api/blogs')
		expect(res.body).toHaveLength(2)
	})

	test('the first attribute is called "id" and not "_id"', async () => {
		const res = await api.get('/api/blogs')
		expect(res.body[0].id).toBeDefined()
	})
})

describe('creating new blogs', () => {
	test('making a HTTP POST req', async () => {
		const myBlog = {
			title:'lol',
			author:'test',
			url:'testing',
			likes: 25
		}
		await api
			.post('/api/blogs')
			.send(myBlog)
		    .expect(201)
		    .expect('Content-Type', /application\/json/)

		// **IMPT** some really weird stuff going on here tbh
		// helper.blogsInDb() returns an array of all the blogs [{item1}, {item2}...]
		// but doing helper.blogsInDb().length is undefined <- i guess is async promise stuff
		// while newLen.length is ok
		// ---
		// Also, note that expect(newLen).toHaveLength(5)
		// is the same as  expect(newLen.length).toBe(5)
		const newLen = await helper.blogsInDb()
	/*	console.log(await helper.blogsInDb().length) // nope, undefined
		console.log(await helper.blogsInDb()) // ok, well defined
		console.log(newLen.length) // ok, well defined
	*/	expect(newLen).toHaveLength(helper.initialBlogs.length + 1) 
	})

	test('if blog with likes is missing, default it to 0', async () => {
		const myBlog = {
			title:'likeszero',
			author:'test',
			url:'testing',
		}
		const res = await api
			.post('/api/blogs')
			.send(myBlog)
		    .expect(201)
		    .expect('Content-Type', /application\/json/)
		expect(res.body.likes).toBe(0)
	})

	test('if blog with title/url missing, should get 400', async () => {
		const myBlog = {
			author:'test',
			likes: 15
		}
		await api
			.post('/api/blogs')
			.send(myBlog)
		    .expect(400)

	})
})

describe('deleting and PUTting blogs', () => {
	test('deleting gives status 204 if id valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDel = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDel.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).not.toContain(blogToDel.title)
	})

	test('PUTting does change the number of likes', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToChange = blogsAtStart[0]

		updated = {...blogToChange, likes: 99999}

		await api
			.put(`/api/blogs/${blogToChange.id}`)
			.send(updated)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd[0].likes).not.toBe(blogsAtStart[0].likes)

	})
})

afterAll(() => {
  mongoose.connection.close()
})