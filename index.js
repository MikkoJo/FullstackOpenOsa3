const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3001

app.use(express.json())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

let persons = [
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
]

app.get('/', (req, res) => res.send('Hello'))

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  const person = persons.find((person) => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const infoText =
    persons.length === 0
      ? 'Phonebook has no entries'
      : `Phonebook has info for ${persons.length} people`
  res.send(`<h3>${infoText}</h3>${new Date()}`)
})

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Missing name or number' })
  } else if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({ error: 'Name must be unique' })
  }
  body.id = getRandomInt(100, 9999999)
  persons = persons.concat(body)
  res.status(201).send(body)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  persons = persons.filter((person) => person.id !== id)
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
