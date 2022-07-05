const express = require('express')
const app = express()
const port = 3001

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
  const infoText = persons.length === 0
  ? 'Phonebook has no entries' : `Phonebook has info for ${persons.length} people`
  res.send(`<h3>${infoText}</h3>${new Date()}`)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id
  persons = persons.filter((person) => person.id !== id)
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
