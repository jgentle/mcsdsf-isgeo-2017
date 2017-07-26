const mongoose = require('mongoose');

const sourceDataSchema = new mongoose.Schema({
  data: []   // will hold JSON data object (index 0).
}, { timestamps: true });

const SourceData = mongoose.model('SourceData', sourceDataSchema);

module.exports = SourceData;
