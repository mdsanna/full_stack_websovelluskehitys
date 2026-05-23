const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.json())
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
    response.json(persons)
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
    const id = request.params.id 
    const person = persons.find(person => person.id === id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
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

    const exists = persons.some(person => person.name === body.name)

    if (exists){
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    const id = Math.floor(Math.random()*100)

    const person = {
      name: body.name,
      number: body.number,
      id: id
    }

    persons = persons.concat(person)
    response.json(persons)
  })

    //deleting a specific person
    app.delete('/api/persons/:id', (request, response) => {
      const id = request.params.id 
      persons = persons.filter(person => person.id != id)
     
      response.status(204).end()
    })

    //listening requests
    const PORT = process.env.port || 3001
      app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })