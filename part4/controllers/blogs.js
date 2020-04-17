const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req,res) => {
	const blogs = await Blog.find({})
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
		res.status(400)
			.send({error:'title and url missing'})
			.end()
	}
	else{
		const blog = new Blog({
		  title: body.title,
		  author: body.author,
		  url: body.url,
		  likes: body.likes || 0
		})

		const saved = await blog.save()
		res.status(201).json(saved.toJSON())
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	await Blog.findByIdAndRemove(id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const body = req.body

	const blog = {
	  title: body.title,
	  author: body.author,
	  url: body.url,
	  likes: body.likes
	}

	const updated = await Blog.findByIdAndUpdate(id, blog, {new : true})
	res.json(updated.toJSON())
})

module.exports = blogsRouter