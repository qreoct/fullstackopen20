const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req,res) => {
	const blogs = await Blog
		.find({}).populate('user', {username: 1})
	res.json(blogs.map(b => b.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (blog){
		res.json(blog.toJSON())
	} else {
		res.status(404).send({error:'blog with this id does not exist'}).end()
	}
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body
	if (!req.body.title && !req.body.url){
		return res.status(400)
			.send({error:'title and url missing'})
			.end()
	}

	// verification of token
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken.id) { //but this bit is ignored when req.token throws error
    	return res.status(401).json({ error: 'token missing or invalid' })
	}
	console.log('user is authorized! posting blog now')
  	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
	  title: body.title,
	  author: body.author,
	  url: body.url,
	  likes: body.likes || 0,
	  user: user._id,
	  comments: body.comments || []
	})

	const saved = await blog.save()
	user.blogs = user.blogs.concat(saved._id)
	await user.save()
	res.status(201).json(saved.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
	// id of blog to delete
	const id = req.params.id

	// verification of token
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken.id) { //but this bit is ignored when req.token throws error
    	return res.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = await Blog.findById(id)
	if(blog === null){return res.status(404).json({ error: 'blog does not exist'}) }
	if(blog.user.toString() !== decodedToken.id.toString()){
		return res.status(401).json({ error: 'user not authorized to delete' })
	}
	await Blog.findByIdAndDelete(id)

	// user that requested
	const user = await User.findById(decodedToken.id)

	user.blogs.filter(b => b.id.toString() !== id.toString())
	await user.save()
	res.status(204).end()
})

blogsRouter.post('/:id/comments', async (req, res) => {
	const id = req.params.id
	const newComment = req.body
	const blog = await Blog.findById(req.params.id)
	if(!blog) {
		res.status(404).send({error:'blog with this id does not exist'}).end()
	}
	console.log('hey', newComment)
	const updatedBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,
		comments: blog.comments.concat(newComment.comment)
	}
	const updated = await Blog.findByIdAndUpdate(id, updatedBlog, {new : true}).populate('user', {username: 1})
	res.json(updated.toJSON())
})
blogsRouter.delete('/:id/comments', async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(req.params.id)
	const updatedBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,
		comments: []
	}
	const updated = await Blog.findByIdAndUpdate(id, updatedBlog, {new : true}).populate('user', {username: 1})
	res.json(updated.toJSON())
})

blogsRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body

	const blog = {
	  title: body.title,
	  author: body.author,
	  url: body.url,
	  likes: body.likes,
	  comments: body.comments
	}

	const updated = await Blog.findByIdAndUpdate(id, blog, {new : true}).populate('user', {username: 1})
	res.json(updated.toJSON())
})

module.exports = blogsRouter