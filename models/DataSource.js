const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSourceSchema = new mongoose.Schema({
  name: String,
  description: String,
  isGeospatial: Boolean,
  isFormulationConfiguration: Boolean,
  isInsight: Boolean,
  isSystemsModel: Boolean,
  isSystemsModelConfiguration: Boolean,
  sourceData_id: { type: Schema.Types.ObjectId, ref: 'JsonData' }   // _id for document in jsondata collection.
}, { timestamps: true });

const DataSource = mongoose.model('DataSource', dataSourceSchema);

module.exports = DataSource;
