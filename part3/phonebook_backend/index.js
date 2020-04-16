require("dotenv").config()
const express = require("express")
const app = express()

// part 3: integration with DB
// all the mongoose stuff is in ./models/person.js, where the connection
// to mongodb is made and exported as an object called Person
const Person = require("./models/person")

app.use(express.json())
app.use(express.static("build"))
// static is a middleware that:
// whenever express (the server) gets an HTTP GET request it will first
// check the "build" directory if it contains a file corresponding
// to the request"s address, and return it if found

const morgan = require("morgan")
// define a new morgan custom token that:
// if the request method is POST, return the req.body also so it gets logged
morgan.token("content", (req) => {
	if (req.method === "POST"){
		return JSON.stringify(req.body)
	}
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

const cors = require("cors")
app.use(cors())

app.get("/", (req, res) => {
	res.send("<p> Welcome to part 3 phonebook_backend. Please visit <a href='/info'> info </a> </p>")
})

app.get("/info", (req, res) => {
	Person
		.find({})
		.then(p => {
			const stats = `Phonebook has info for ${p.length} people currently`
			const time = new Date()

			res.send(`<p> ${stats} </p> <p> ${time} </p>`)
		})
})

app.get("/api/persons", (req, res) => {
	Person
		.find({})
		.then( persons => {
			res.json(persons.map(p => p.toJSON()))
		})
})

app.get("/api/persons/:id", (req, res, next) => {
	const id = req.params.id
	Person
		.findById(id)
		.then(p => {
			if(p){
				res.json(p.toJSON())
			}else{
				res.status(404).send({ error: "user with this id does not exist" }).end()
			}
		})
		.catch( e => next(e) )
})

app.put("/api/persons/:id", (req,res,next) => {
	const body = req.body
	const id = String(req.params.id)

	const updatedPerson = {
		name: body.name,
		number: body.number,
	}

	Person
		.findByIdAndUpdate(id, updatedPerson, { new: true })
		.then(p => {
			res.json(p.toJSON())
		})
		.catch( e => next(e) )
})

app.delete("/api/persons/:id", (req,res,next) => {
	const id = String(req.params.id)
	Person
		.findByIdAndRemove(id)
		.then(p => {
			if (p) {
				res.status(204).end()
			}else{
				res.status(400).send({ error: "id does not exist" }).end()
			}
		})
		.catch((e) => next(e))

})

app.post("/api/persons", (req,res,next) => {
	const guy = req.body

	if (!guy.name || !guy.number) {
		return res.status(400).json({
			error: "name/number missing"
		})
	}
	const person = new Person({
		name: guy.name,
		number: guy.number
	})

	person
		.save()
		.then(savedPerson => {
			res.json(savedPerson.toJSON())
		})
		.catch(e => next(e))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})


const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
	if (err.name === "CastError") {
		return res.status(400).send({ error:"malformatted id" })
	}
	else if (err.name === "ValidationError") {
		return res.status(400).send({ error:"please check that name length is > 3, number length is > 8" })
	}
	next(err)
}
app.use(errorHandler)

