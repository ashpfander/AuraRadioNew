const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String
});

const Mood = mongoose.model('Mood', moodSchema);
module.exports = Mood;