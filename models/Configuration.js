const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  name: String,
  dataMapping: []   // will hold JSON data object (index 0).
}, { timestamps: true });

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;
