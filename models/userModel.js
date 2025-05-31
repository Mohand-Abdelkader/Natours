/* eslint-disable import/no-extraneous-dependencies */
const mongooes = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
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
      message: 'password are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  //only run this function if password realy modifesd

  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongooes.model('User', userSchema);

module.exports = User;
