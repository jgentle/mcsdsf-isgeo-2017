const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulationConfigurationSchema = new mongoose.Schema({
  name: String,
  description: String,
  dataSource_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for subdocument in datasources collection.
  geodataSource_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for subdocument in datasources collection.
  configurationData_id: { type: Schema.Types.ObjectId, ref: 'DataSource' },   // _id for subdocument in datasources collection.
  isValidated: Boolean   // check to ensure all subsubdocuments have been validated.
}, { timestamps: true });

const FormulationConfiguration = mongoose.model('FormulationConfiguration', formulationConfigurationSchema);

module.exports = FormulationConfiguration;
