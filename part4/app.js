const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((err) => {
		logger.error('error connecting to MongoDB:', err.message)
	})

app.use(cors()) // allow cross origin reference to ensure local requests work
app.use(express.static('build')) // handle all GET req to '/' to serve from build directory instead
app.use(express.json()) // allow json parsing
app.use(middleware.requestLogger) // run our middleware that handles logging requests (like morgan)

app.use('/api/blogs', blogsRouter) // the blogsRouter is only used if the url of the request beings with '/api/blogs'

app.use(middleware.unknownEndpoint) // our middleware for 404/unknown requests
app.use(middleware.errorHandler) // our middleware for handling errors

module.exports = app