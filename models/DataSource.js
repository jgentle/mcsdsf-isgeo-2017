const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSourceSchema = new mongoose.Schema({
  name: String,
  description: String,
  isGeospatial: Boolean,
  dataFormat: String,
  sourceData: { type: Schema.Types.ObjectId, ref: 'JsonData' },   // _id for document in sourcedata collection.
}, { timestamps: true });

const DataSource = mongoose.model('DataSource', dataSourceSchema);

module.exports = DataSource;
