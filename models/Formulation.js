const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulationSchema = new mongoose.Schema({
  name: String,
  description: String,
  dataSource_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for document in datasources collection.
  geodataSource_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for document in datasources collection.
  systemsModel_id: { type: Schema.Types.ObjectId, ref: 'SystemsModel' },   // _id for document in datasources collection.
  configuration_id: { type: Schema.Types.ObjectId, ref: 'Configuration' },   // _id for document in configuration collection.
  insights: [{ type: Schema.Types.ObjectId, ref: 'Insight' }]   // Array of subdocument _ids for documents in the insights collection.
}, { timestamps: true });

const Formulation = mongoose.model('Formulation', formulationSchema);

module.exports = Formulation;
