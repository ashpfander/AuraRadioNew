const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash the password before saving it to the database
userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

// Add a method to the schema to validate a password
userSchema.methods.isCorrectPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
