const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then(() => console.log(`Connected to MongoDB at ${url}`))
  .catch((error) => console.log(`Error connecting to MongoDB ${error.message}`))

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{6,}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phonenumber.`,
    },
    required: [true, 'Phonenumber is required.'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
