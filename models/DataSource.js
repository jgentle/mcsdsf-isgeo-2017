const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSourceSchema = new mongoose.Schema({
  name: String,
  description: String,
  isGeospatial: Boolean,
  dataFormat: String,
  sourceData: { type: Schema.Types.ObjectId, ref: 'SourceData' },   // _id for document in configuration collection.
}, { timestamps: true });

const DataSource = mongoose.model('DataSource', dataSourceSchema);

module.exports = DataSource;
