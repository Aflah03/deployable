const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
const requestLogger = (req, res, next) => {
	console.log('Method: ', req.method);
	console.log('Path: ', req.path);
	console.log(' body: ', req.body);
	console.log('---------------');
	next()
}
// app.use(requestLogger)
// app.use(morgan('tiny'))
app.use(morgan(function(tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms'
	].join(' ')
}))
let persons =
	[
		{
			"id": "1",
			"name": "Arto Hellas",
			"number": "040-123456"
		},
		{
			"id": "2",
			"name": "Ada Lovelace",
			"number": "39-44-5323523"
		},
		{
			"id": "3",
			"name": "Dan Abramov",
			"number": "12-43-234345"
		},
		{
			"id": "4",
			"name": "Mary Poppendieck",
			"number": "39-23-6423122"
		}
	]

app.get('/', (req, res) => {
	res.send("hello ")
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id
	const item = persons.find((person) => {
		return person.id === id
	})
	if (!item) {
		return res.status(404).json("Item with given id not found ")
	}
	res.json(item)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	persons = persons.filter((person) => person.id !== id)
	res.sendStatus(202)
})

app.get('/info', (req, res) => {
	const date = new Date()
	res.send(`<p>Phonebook has ${persons.length} people 
           <p>${date} </p>`)
})

app.post('/api/persons/', (req, res) => {
	const id = Math.round(Math.random() * 10000)
	const body = req.body
	console.log(req.headers);

	console.log(body);


	const newObj = {
		"id": `${id}`,
		"name": req.body.name,
		"number": req.body.number
	}
	if (!newObj.name) {
		return res.status(400).json({
			error: 'please provide the name'
		})
	}
	if (persons.some(person => person.name === newObj.name)) {
		return res.status(400).json('cannot add dup values')
	}
	persons = persons.concat(newObj)
	res.json(newObj)
})
//when modifying number of contacts that already exist
app.put('/api/persons/:id', (req, res) => {
	const id = req.params.id
	const obj = persons.find(person => person.id === id)
	const newObj = { ...obj, "number": req.body.number }
	persons = persons.map(person => {
		if (person.id === id) {
			return newObj
		} else {
			return person
		}
	})
	if (obj) {
		res.json(newObj)
	}
	res.status(400).json('object not found')
})
const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endponit' })
}
app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT, () => {
	console.log('app listening on port 3001');
})
