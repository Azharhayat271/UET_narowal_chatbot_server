const mongoose = require('mongoose');
const qaSchema = new mongoose.Schema({
    question: String,
    answer: String,
  });

const Qa = mongoose.model('Qa', qaSchema);
module.exports = Qa;
  

