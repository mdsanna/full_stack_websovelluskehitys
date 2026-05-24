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

    Person.find({})
      .then(persons => {
        response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>
      `)
    })
     

  })

  //getting specific person
  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
          response.status(404).end()
      }
    })
    .catch(error => next(error))

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

  //updating person
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      } 
    
      person.name = body.name
      person.number = body.number

      person.save()
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error =>next(error))
  })


  //deleting a specific person
  app.delete('/api/persons/:id', (request, response, next) => {
      Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })


  const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
  }

    app.use(errorHandler)

    //listening requests
    const PORT = process.env.PORT
      app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })