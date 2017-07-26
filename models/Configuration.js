const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  name: String,
  // Need to develop schema for configuration model.
  dataMapping: []   // Array holds JSON data object (index 0).
}, { timestamps: true });

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;
