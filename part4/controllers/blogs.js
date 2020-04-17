const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req,res) => {
	Blog.find({})
		.then(blogs => {
			res.json(blogs.map(b => b.toJSON()))
		})
})

blogsRouter.get('/:id', (req, res, next) => {
	Blog.findById(req.params.id)
		.then(blog => {
			if (blog){
				res.json(blog.toJSON())
			} else {
				res.status(404).send({error:'blog with this id does not exist'}).end()
			}
		})
		.catch(err => next(err))
})

blogsRouter.post('/', (req, res, next) => {
	const body = req.body

	const blog = new Blog({
	  title: body.title,
	  author: body.author,
	  url: body.url,
	  likes: body.likes
	})

	blog.save()
		.then(savedBlog => {
			res.json(savedBlog.toJSON())
		})
		.catch(err => next(err))
})

blogsRouter.delete('/:id', (req, res, next) => {
	const id = req.params.id
	Blog.findByIdAndRemove(id)
		.then(() => {
			res.status(204).end()
		})
		.catch(err => next(err))
})

blogsRouter.put('/:id', (req, res, next) => {
	const id = req.params.id
	const body = req.body

	const blog = {
	  title: body.title,
	  author: body.author,
	  url: body.url,
	  likes: body.likes
	}

	Blog.findByIdAndUpdate(id, blog, {new : true})
		.then(updatedBlog => {
			res.json(updatedBlog.toJSON())
		})
		.catch(err => next(err))
})

module.exports = blogsRouter