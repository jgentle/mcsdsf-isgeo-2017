const mongoose = require('mongoose');

const jsonDataSchema = new mongoose.Schema({
  // Need to develop schema for jsonData model.
  jsonData: []   // Array holds JSON data object (index 0).
}, { timestamps: true });

const JsonData = mongoose.model('JsonData', jsonDataSchema);

module.exports = JsonData;
