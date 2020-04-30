const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const initialBlogs = [
{
	title:'node test blog 1',
	author:'author A',
	url:'sitea',
	likes: 14
},
{
	title:'testing supertest blog 2',
	author:'Billy Bielish',
	url:'b.com',
	likes: 84
},
]

const initialUsers = [
{
	username:'root',
	name:'superman',
	password:'superman'
},
{
	username:'sadfjkl',
	name:'bane',
	password:'hunter2'
}
]

const nonExistingId = async () => {
	// returns a non existing ID
	const blog = new Blog({ title: 'willremovethissoon' })
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	//returns all blogs in db
	const blogs = await Blog.find({})
	return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}