const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  name: String,
  // dataMapping: []   // Array holds JSON data object (index 0).
  dataMapping: { type: Schema.Types.ObjectId, ref: 'JsonData' }   // _id for document in sourcedata collection.
}, { timestamps: true });

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;
