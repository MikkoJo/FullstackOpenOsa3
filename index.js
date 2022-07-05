const express = require('express')
const app = express()
const port = 3001

const persons = [
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

app.get('/info', (req, res) => {
  let infoText
  if (persons.length === 0) {
    infoText = 'Phonebook has no entries'
  } else {
    infoText = `Phonebook has info for ${persons.length} people`
  }
  res.send(`<h3>${infoText}</h3>${new Date()}`)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
