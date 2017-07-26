const mongoose = require('mongoose');

const jsonDataSchema = new mongoose.Schema({
  jsonData: []   // Array holds JSON data object (index 0).
}, { timestamps: true });

const JsonData = mongoose.model('JsonData', jsonDataSchema);

module.exports = JsonData;
