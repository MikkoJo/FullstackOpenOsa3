const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
// const { response } = require('express')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

const PORT = process.env.PORT || 3001

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

/* let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456789',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-898799',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '99-46566461',
  },
  {
    id: 4,
    name: 'Mary Poppendic',
    number: '050-658912112',
  },
] */

// Populate DB
// persons.forEach((person) => {
//   const newPerson = new Person({
//     name: person.name,
//     number: person.number,
//   })
//   newPerson.save()
// })

app.get('/', (req, res) => res.send('Hello, nothing here!'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = +req.params.id
  const person = persons.find((person) => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  Person.find({}).then((persons) => {
    const infoText =
      persons.length === 0
        ? 'Phonebook has no entries'
        : `Phonebook has info for ${persons.length} people`
    res.send(`<h3>${infoText}</h3>${new Date()}`)
  })
})

// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + min)
// }

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Missing name or number' })
  } // else if (persons.find((person) => person.name === body.name)) {
  //   return res.status(400).json({ error: 'Name must be unique' })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    // console.log(savedPerson)
    res.status(201).json(savedPerson)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Missing name or number' })
  }
  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed id' })
  }

  next(error)
}
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
