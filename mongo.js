/*
mongodb+srv://zona:<password>@cluster0.fajbtwy.mongodb.net/phoneBook?retryWrites=true&w=majority
*/

const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: node mongo.js password [name phonenumber]')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://zona:${password}@cluster0.fajbtwy.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('Phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    console.log('In find before close')
    mongoose.connection.close()
    console.log('In find after close')
  })
} else {
  console.log('in Add')
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook.`)
    mongoose.connection.close()
  })
}
