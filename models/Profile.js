const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  birthday: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);