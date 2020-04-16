const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  //`mongodb+srv://admin:${password}@ofs20-ws6l.mongodb.net/test?retryWrites=true&w=majority`
  `mongodb://admin:${password}@ofs20-shard-00-00-wsq6l.mongodb.net:27017,ofs20-shard-00-01-wsq6l.mongodb.net:27017,ofs20-shard-00-02-wsq6l.mongodb.net:27017/test?ssl=true&replicaSet=ofs20-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]){
	// if arg 3 (name) and arg 4 (number) are provided, add to collection
	const person = new Person({
		name: String(process.argv[3]),
		number: Number(process.argv[4])
	})

	person
		.save()
		.then(response => {
		  console.log(`new person ${response.name} with number ${response.number} saved`)
		  mongoose.connection.close()
		})
}
else{
	// else just display current phonebook
	Person
		.find({})
		.then(res =>{
			console.log('phonebook:')
			res.forEach(p =>{
				console.log(`${p.name} #:${p.number}`)
			})
			mongoose.connection.close()
		})
}