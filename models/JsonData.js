const mongoose = require('mongoose');

const jsonDataSchema = new mongoose.Schema({
  originalFileName: String,
  originalDataFormat: String,
  jsonData: [],   // Array holds embedded JSON data object (index 0).
  isValidated: Boolean,
  validatedAt: Date
}, { timestamps: true });

const JsonData = mongoose.model('JsonData', jsonDataSchema);

module.exports = JsonData;
