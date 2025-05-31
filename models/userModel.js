const mongooes = require('mongoose');
const validator = require('validator');

const userSchema = new mongooes.Schema({
  name: {
    type: String,
    required: [true, 'each user must have a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'each user must have a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please enter valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'you must enter a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'you must confirm the password'],
    validate: {
      validator: function (val) {
        // this will work only in create because this work only on created doc
        return val === this.password;
      },
    },
  },
});

const User = mongooes.model('User', userSchema);

module.exports = User;
