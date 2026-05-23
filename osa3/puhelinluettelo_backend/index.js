require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

morgan.token('req-content', function (req, res) {
  if (req.method === 'POST' || req.method === 'PUT') {
    return (JSON.stringify(req.body))
  }
  return ''
  })  

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-content'))

let persons =
[
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    }, 
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]
  //getting all persons
  app.get('/api/persons', (request, response) => {
    Person.find({})
    .then(persons => {
      response.json(persons)
    })
  })

  //getting information
  app.get('/info', (request, response) => {
     const time = new Date()
     
     response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${time}</p>
    `)
  })

  //getting specific person
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })

  })

  //adding a new person
  app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

    const person = new Person ({
      name: body.name,
      number: body.number,
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })

  })

  /**
    //deleting a specific person
    app.delete('/api/persons/:id', (request, response) => {
      const id = request.params.id 
      persons = persons.filter(person => person.id != id)
     
      response.status(204).end()
    })
*/ 

    //listening requests
    const PORT = process.env.PORT
      app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })